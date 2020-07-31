import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes, { any } from 'prop-types';
import AElf from 'aelf-sdk';
import { withTranslation } from 'react-i18next';
import {
  Input,
  Button,
  Spin,
  message
} from 'antd';
import { If, Then, Else } from 'react-if';
import { END_POINT, mnemonic, randomAddress } from '../../../../common/constants';
import { sleep } from '../../common/utils';
import bottomBg from '../../../../static/randomBottomBg.png';
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
      minNumber: null,
      maxNumber: null,
      inputErrShow: false
    };
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
        blockHeight
      } = location.state;
      this.setState({
        minNumber,
        maxNumber,
        randomNumber,
      });

      this.hash = hash;
      this.blockHeight = blockHeight;
    }

    const aelf = new AElf(new AElf.providers.HttpProvider(END_POINT));
    this.aelf = aelf;
    // const { sha256 } = AElf.utils;ß
    const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);
    aelf.chain.getChainStatus()
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

    if (maxNumber - minNumber <= 0 || !maxNumber || !minNumber) {
      this.setState({ inputErrShow: true });
      return;
    }

    this.setState(() => ({
      inputErrShow: false,
      randomLoading: true
    }), this.getRandom);
  }

  getRandom = async () => {
    if (this.randomContract === null) {
      // 如果componentDidMount里面还未获取到contract 实利，等待2s 才能进行合约的获取，可根据链的实际情况做修改.
      await sleep(2000);
    }

    try {
      const { minNumber, maxNumber } = this.state;

      const { TransactionId } = await this.randomContract.GetRandomNumber({
        min: parseInt(minNumber, 10),
        max: parseInt(maxNumber, 10)
      });

      this.getRandomValueByTxId(TransactionId, 0);
    } catch (err) {
      message.error(err.detail);
    }
  }

  getRandomValueByTxId = async (txId, count) => {
    const getRandomresult = await this.aelf.chain.getTxResult(txId);

    if (getRandomresult.Status === 'MINED' || count === 10) {
      const { minNumber, maxNumber } = this.state;

      const {
        random: randomNumber,
        blockHeight,
        hash
      } = await this.randomContract.GetRandomNumber.call({
        min: parseInt(minNumber, 10),
        max: parseInt(maxNumber, 10)
      });

      this.blockHeight = blockHeight;
      this.hash = hash;

      this.setState({
        randomLoading: false,
        randomNumber
      });
    } else {
      await sleep(1000);
      this.getRandomValueByTxId(txId, count + 1);
    }
  }

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
      randomNumber,
      minNumber,
      maxNumber,
    } = this.state;
    const { hash, blockHeight } = this;
    const { history } = this.props;
    const params = {
      randomNumber,
      hash,
      blockHeight,
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
      randomNumber, randomLoading, minNumber, maxNumber, inputErrShow
    } = this.state;
    const { t, i18n } = this.props;
    return (
      <div className={classPrefix}>
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
                disabled={randomLoading}
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
                disabled={randomLoading}
              />
            </div>
            <Button
              type="primary"
              className={`${classPrefix}-generate`}
              onClick={this.getClick}
              disabled={randomLoading}
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
              <If condition={randomLoading}>
                <Then>
                  <Spin />
                </Then>
                <Else>
                  <Input
                    className={`${classPrefix}-input-frame ${classPrefix}-verify-value`}
                    placeholder={t('result')}
                    value={
                      randomNumber
                    }
                    disabled
                  />
                </Else>
              </If>
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
