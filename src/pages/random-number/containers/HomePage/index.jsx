import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AElf from 'aelf-sdk';
import { withTranslation } from 'react-i18next';
import {
  Input,
  Button,
  Spin,
  message
} from 'antd';
import { If, Then, Else } from 'react-if';
import { END_POINT, mnemonic, consensusContractName } from '../../../../common/constants';
import { sleep, stringToIntHash } from '../../common/utils';
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
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      randomNumber: false,
      randomLoading: false,
      minNumber: null,
      minErr: false,
      maxNumber: null,
      maxErr: false,
      inputErrShow: false
    };
    this.aelf = null;
    this.consensusContract = null;
  }

  componentDidMount() {
    // 组件加载完成，开始获取实例
    const aelf = new AElf(new AElf.providers.HttpProvider(END_POINT));
    this.aelf = aelf;
    const { sha256 } = AElf.utils;
    const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);
    aelf.chain.getChainStatus()
      .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
      .then(zeroC => zeroC.GetContractAddressByName.call(sha256(consensusContractName)))
      .then(consensusAddress => aelf.chain.contractAt(consensusAddress, wallet))
      .then(consensusContract => {
        this.consensusContract = consensusContract;
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  getRandom = async (requestRandomTId, frequency, sign) => {
    await sleep(4000);
    let getRandomReadableData = false;
    try {
      const getRandomTId = await this.consensusContract.GetRandomNumber(requestRandomTId.TransactionId);
      await sleep(1000);
      let getRandomresult = await this.aelf.chain.getTxResult(getRandomTId.TransactionId);

      if (getRandomresult.Status !== 'MINED') {
        // 获取result等待时间不够,继续等待一次
        await sleep(3000);
        getRandomresult = await this.aelf.chain.getTxResult(getRandomTId.TransactionId);

        if (getRandomresult.Status !== 'MINED') {
          // 再获取失败直接报错
          throw new Error({ Status: '获取数据失败' });
        }
      }

      if (getRandomresult.Status === 'MINED') {
        // 成功获取，返回数据
        getRandomReadableData = getRandomresult.ReadableReturnValue.replace(/\"/g, '');
        this.setState({
          randomNumber: getRandomReadableData,
          randomLoading: false
        });
      }
    } catch (err) {
      console.log(err, frequency);
      if (err.Status !== 'MINED' && frequency < 10) {
        // get等待时间过短重新发送请求，超过10次认为失败
        const nextFrequency = frequency + 1;
        await this.getRandom(requestRandomTId, nextFrequency);
      } else if (sign) {
        // 第二次发送随机数请求并获取失败，报错
        this.setState({
          randomNumber: getRandomReadableData,
          randomLoading: false
        });
        message.info('请重试');
      } else {
        // 重新获取一次
        await this.getClick(true);
      }
    }

    return null;
  }

  getClick = async sign => {
    const {
      minNumber, maxNumber, minErr, maxErr
    } = this.state;

    if (maxErr || minErr || !maxNumber || !minNumber) {
      this.setState({ inputErrShow: true });
      return;
    }

    this.setState({
      randomLoading: true
    });

    if (this.consensusContract === null) {
      // 如果componentDidMount里面还未获取到contract 实利，等待2s 才能进行合约的获取，可根据链的实际情况做修改.
      await sleep(2000);
    }

    const requestRandomTId = await this.consensusContract.RequestRandomNumber(0);
    await this.getRandom(requestRandomTId, 0, sign);
  }

  minNumberChange = e => {
    const minNumber = e.target.value;
    const { maxNumber } = this.state;
    let minErr = false;
    if (minNumber < 0 || (maxNumber && minNumber - maxNumber >= 0)) {
      minErr = true;
    }
    this.setState({ minNumber, minErr, inputErrShow: false });
  }

  maxNumberChange = e => {
    const maxNumber = e.target.value;
    const { minNumber } = this.state;
    let maxErr = false;
    if (minNumber && maxNumber - minNumber <= 0) {
      maxErr = true;
    }
    this.setState({ maxNumber, maxErr, inputErrShow: false });
  }

  render() {
    const {
      randomNumber, randomLoading, minNumber, maxNumber, minErr, maxErr, inputErrShow
    } = this.state;
    const { t, i18n } = this.props;
    const inputErr = Boolean(inputErrShow && (maxErr || minErr || !maxNumber || !minNumber));
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
            <a className={`${classPrefix}-learnMore`} href="https://github.com/aelfProject">{t('learnMore')}</a>
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
              className={`${classPrefix}-inputErr ${inputErr ? '' : 'hidden'}`}
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
                    className={`${classPrefix}-input-frame`}
                    value={
                      randomNumber
                        ? stringToIntHash(randomNumber, parseInt(minNumber, 10), parseInt(maxNumber, 10))
                        : ''
                    }
                    disabled
                  />
                </Else>
              </If>
            </div>
          </div>
        </div>
        <img alt="" className={`${classPrefix}-bottom-bg`} src={bottomBg} />
      </div>
    );
  }
}

export default withRouter(withTranslation()(HomePage));
