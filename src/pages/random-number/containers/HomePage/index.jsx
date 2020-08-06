import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes, { any } from 'prop-types';
import AElf from 'aelf-sdk';
import { withTranslation } from 'react-i18next';
import {
  Input,
  Button,
  message
} from 'antd';
import { If, Then } from 'react-if';
import { END_POINT, walletPrivateKey, randomAddress } from '../../../../common/constants';
import { sleep } from '../../common/utils';
import bottomBg from '../../../../static/randomBottomBg.png';
import StepLoading from '../../components/StepLoading';
import { STATUS } from './status';
import './index.less';

const classPrefix = 'home';

class HomePage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      language: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      state: any
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      randomNumber: '',
      randomLoading: false,
      minNumber: 0,
      maxNumber: 10,
      inputErrShow: false,
      currentStep: 0,
    };
    const { minNumber, maxNumber } = this.state;
    this.minNumber = minNumber;
    this.maxNumber = maxNumber;
    this.aelf = null;
    this.randomContract = null;
    this.blockHeight = null;
    this.hash = null;
  }

  componentDidMount() {
    // 组件加载完成，开始获取实例
    const { location } = this.props;

    // After the verification page returns, initialize some data
    if (location.state) {
      const {
        minNumber,
        maxNumber,
        randomNumber,
        hash,
        currentBlockHeight,
        requestBlockHeight,
        randomBlockHeight,
        playId
      } = location.state;
      this.setState({
        minNumber,
        maxNumber,
        randomNumber,
      });

      this.hash = hash;
      this.currentBlockHeight = currentBlockHeight;
      this.requestBlockHeight = requestBlockHeight;
      this.randomBlockHeight = randomBlockHeight;
      this.playId = playId;
      this.lastMinNumber = minNumber;
      this.lastMaxNumber = maxNumber;
    }

    const aelf = new AElf(new AElf.providers.HttpProvider(END_POINT));
    this.aelf = aelf;
    // const { sha256 } = AElf.utils;
    const wallet = AElf.wallet.getWalletByPrivateKey(walletPrivateKey);
    aelf.chain.getChainStatus()
      .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
      .then(() => aelf.chain.contractAt(randomAddress, wallet))
      .then(randomContract => {
        this.randomContract = randomContract;
      })
      .then(() => this.randomContract.Hello())
      .catch(err => {
        console.log('err', err);
      });
  }

  getClick = async () => {
    const {
      minNumber, maxNumber
    } = this.state;

    if (maxNumber - minNumber <= 0 || parseInt(maxNumber, 10) < 0 || parseInt(minNumber, 10) < 0) {
      this.setState({ inputErrShow: true });
      return;
    }


    const params = {
      min: parseInt(minNumber, 10),
      max: parseInt(maxNumber, 10) + 1,
      blockInterval: 16
    };

    this.lastMinNumber = minNumber;
    this.lastMaxNumber = maxNumber;

    this.setState(() => ({
      inputErrShow: false,
      randomLoading: true
    }));

    this.getRandom(params);
  }

  getRandom = async ({ min, max, blockInterval }) => {
    if (this.randomContract === null) {
      // 如果componentDidMount里面还未获取到contract 实利，等待2s 才能进行合约的获取，可根据链的实际情况做修改.
      await sleep(2000);
    }

    const isCanGetRandom = async randomHeight => {
      const currentBlockHeight = await this.aelf.chain.getBlockHeight.call();
      if (parseInt(randomHeight, 10) <= currentBlockHeight) {
        return true;
      }

      await sleep(1500);
      const value = await isCanGetRandom(randomHeight);
      return value;
    };

    try {
      await sleep(500);
      this.setState({
        currentStep: 1,
      });

      const requestRandomRes = await this.randomContract.RequestRandom({
        min,
        max,
        blockInterval
      });
      this.setState({
        currentStep: 2,
      });

      // get generate random block height
      const randomHeight = await this.getTxResult(requestRandomRes, async data => {
        this.setState({
          currentStep: 3
        });
        const { randomBlockHeight } = await this.randomContract.RequestRandom.unpackOutput(data.ReturnValue);
        return randomBlockHeight;
      });

      // current block height is heighter then generate random
      if (await isCanGetRandom(randomHeight)) {
        this.setState({
          currentStep: 4
        });
        const rest = await this.randomContract.GetRandom(requestRandomRes.TransactionId);
        await sleep(800);
        this.setState({
          currentStep: 5
        });

        await sleep(700);
        this.setState({
          currentStep: 6
        });

        await sleep(600);
        this.setState({
          currentStep: 7
        });
        this.getTxResult(rest, async data => {
          this.setState({
            currentStep: 8
          });

          await sleep(100);
          const {
            hash,
            random: randomNumber,
            playId,
            randomBlockHeight,
            requestBlockHeight,
            currentBlockHeight
          } = await this.randomContract.GetRandom.unpackOutput(data.ReturnValue);
          this.setState({
            currentStep: 9
          });

          this.currentBlockHeight = currentBlockHeight;
          this.requestBlockHeight = requestBlockHeight;
          this.randomBlockHeight = randomBlockHeight;
          this.playId = playId;
          this.hash = hash;

          this.setState({
            randomLoading: false,
            currentStep: 0,
            randomNumber
          });
        });
      }
    } catch (err) {
      message.error(err.detail);
    }
  }

  getTxResult = async (res, callback = async () => {}) => {
    const data = await this.aelf.chain.getTxResult(res.TransactionId);

    if (data.Status === 'MINED') {
      const value = await callback(data);
      return value;
    }

    await sleep(1500);
    const value = await this.getTxResult(res, callback);
    return value;
  };

  minNumberChange = e => {
    // Limit input other conceited
    const minNumber = e.target.value.replace(/[^\d]/g, '');
    this.setState({ minNumber });
  }

  maxNumberChange = e => {
    // Limit input other conceited
    const maxNumber = e.target.value.replace(/[^\d]/g, '');

    this.setState({ maxNumber });
  }

  // Processing verification logic
  handleVerifyClick = () => {
    const {
      randomNumber
    } = this.state;
    const {
      hash,
      currentBlockHeight,
      requestBlockHeight,
      randomBlockHeight,
      playId,
      lastMinNumber: minNumber,
      lastMaxNumber: maxNumber
    } = this;

    const { history } = this.props;
    const params = {
      randomNumber,
      hash,
      currentBlockHeight,
      requestBlockHeight,
      randomBlockHeight,
      playId,
      minNumber,
      maxNumber
    };

    sessionStorage.setItem('verifyData', JSON.stringify(params));

    history.push({
      pathname: '/verify',
      state: params
    });
  }

  render() {
    const {
      randomNumber, randomLoading, minNumber, maxNumber, inputErrShow, currentStep
    } = this.state;
    const { t, i18n } = this.props;
    return (
      <div className={classPrefix}>
        <StepLoading
          steps={STATUS.map(item => t(item))}
          condition={randomLoading}
          currentStep={currentStep}
        />
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-leftContent`}>
            <div className={`${classPrefix}-text-aelf`}>{t('aelf')}</div>
            <div className={`${classPrefix}-text-generation`}>{t('generationRandomNumber')}</div>
            <If condition={i18n.language !== 'en'}>
              <Then>
                <div className={`${classPrefix}-text-generation-zh`}>The Generation Plan of Random Number</div>
              </Then>
            </If>
            {/* 根据产品的要求，预留一个链接 */}
            {/* <a className={`${classPrefix}-learnMore`} href="https://github.com/aelfProject">{t('learnMore')}</a> */}
          </div>
          <div className={`${classPrefix}-rightContent`}>
            <div className={`${classPrefix}-generationRandom`}>{t('generationRandom')}</div>
            <div className={`${classPrefix}-input`}>
              <span className={`${classPrefix}-input-text`}>
                {t('minNumber')}
              </span>
              <Input
                className={`${classPrefix}-input-frame`}
                allowClear
                onChange={this.minNumberChange}
                value={minNumber}
                placeholder={t('minPlaceholder')}
              />
            </div>
            <div className={`${classPrefix}-input`}>
              <span className={`${classPrefix}-input-text`}>
                {t('maxNumber')}
              </span>
              <Input
                className={`${classPrefix}-input-frame`}
                allowClear
                onChange={this.maxNumberChange}
                value={maxNumber}
                placeholder={t('maxPlaceholder')}
              />
            </div>
            <Button
              type="primary"
              className={`${classPrefix}-generate`}
              onClick={this.getClick}
            >
              {t('generate')}
            </Button>
            <div
              className={`${classPrefix}-inputErr ${inputErrShow ? '' : 'hidden'}`}
            >
              {t('inputError')}
            </div>
            <div className={`${classPrefix}-input`}>
              <span className={`${classPrefix}-input-text text-weight`}>
                {`${t('result')} `}
              </span>
              <Input
                className={`${classPrefix}-input-frame ${classPrefix}-verify-value`}
                placeholder={t('result')}
                value={
                  randomNumber
                }
                disabled
              />
            </div>
            <Button
              className={`${classPrefix}-verify`}
              disabled={randomNumber === ''}
              onClick={this.handleVerifyClick}
            >
              {t('verify')}
            </Button>
          </div>
        </div>
        <img alt="" className={`${classPrefix}-bottom-bg`} src={bottomBg} />
      </div>
    );
  }
}

export default withRouter(withTranslation()(HomePage));
