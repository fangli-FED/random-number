import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AElf from 'aelf-sdk';
import {
  Button, ActivityIndicator, List, InputItem, Toast
} from 'antd-mobile';
import { If, Then, Else } from 'react-if';
import { localHttp, mnemonic, consensusContractName } from '../../../../common/constants';
import { sleep, stringToIntHash } from '../../common/publicFunc';
import './index.less';


const inputItemType = 'money';

class HomePage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      randomNumber: false,
      randomLoading: false,
      minNumber: 1,
      minErr: false,
      maxNumber: 500,
      maxErr: false
    };
    this.aelf = null;
    this.consensusContract = null;
    this.tokenHash = null;
  }

  componentDidMount() {
    const aelf = new AElf(new AElf.providers.HttpProvider(localHttp));
    if (!aelf.isConnected()) {
      console.error('Blockchain is not running');
    } else {
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
  }

  getRandom = async (requestRandomTId, frequency, sign) => {
    await sleep(4000);
    let getRandomReadableData = false;
    try {
      const getRandomTId = await this.consensusContract.GetRandomNumber(requestRandomTId.TransactionId);
      // console.log('getRandomTId', getRandomTId);
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

      console.log('getRandomresult', getRandomresult);
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
        Toast.info('请重试');
      } else {
        // 重新获取一次
        await this.getClick(true);
      }
    }

    return null;
  }

  getClick = async sign => {
    this.setState({
      randomLoading: true
    });
    if (this.consensusContract === null) {
      await sleep(2000);
    }

    const requestRandomTId = await this.consensusContract.RequestRandomNumber(0);
    await this.getRandom(requestRandomTId, 0, sign);
  }

  lotteryClick = () => {
    const { history } = this.props;
    history.push('/lottery');
  }

  commentClick = () => {
    const { history } = this.props;
    history.push('/comment');
  }

  minNumberChange = minNumber => {
    const { maxNumber } = this.state;
    let minErr = false;
    if (maxNumber && minNumber - maxNumber >= 0) {
      minErr = true;
    }
    this.setState({ minNumber, minErr });
  }

  onMinErrorClick = () => {
    const { minErr } = this.state;
    if (minErr) {
      Toast.info('最小值要小于最大值');
    }
  }

  maxNumberChange = maxNumber => {
    const { minNumber } = this.state;
    let maxErr = false;
    if (minNumber && maxNumber - minNumber <= 0) {
      maxErr = true;
    }
    this.setState({ maxNumber, maxErr });
  }

  onMaxErrorClick = () => {
    const { maxErr } = this.state;
    if (maxErr) {
      Toast.info('最大值要大于最小值');
    }
  }

  render() {
    const {
      randomNumber, randomLoading, minNumber, maxNumber, minErr, maxErr
    } = this.state;
    return (
      <div className="home">
        <List className="home-range">
          <InputItem
            clear
            type={inputItemType}
            onChange={this.minNumberChange}
            value={minNumber}
            disabled={randomLoading}
            error={minErr}
            onErrorClick={this.onMinErrorClick}
          >
            最小值
          </InputItem>
          <InputItem
            clear
            type={inputItemType}
            onChange={this.maxNumberChange}
            value={maxNumber}
            disabled={randomLoading}
            error={maxErr}
            onErrorClick={this.onMaxErrorClick}
          >
            最大值
          </InputItem>
        </List>
        <Button
          className="home-btn"
          onClick={this.getClick}
          disabled={randomLoading || maxErr || minErr || !maxNumber || !minNumber}
        >
          点击获取
        </Button>
        <div className="home-lotterShow">
          <If condition={randomLoading}>
            <Then>
              <ActivityIndicator
                text="Loading..."
              />
            </Then>
            <Else>
              <>
                {randomNumber
                  ? stringToIntHash(randomNumber, parseInt(minNumber, 10), parseInt(maxNumber, 10))
                  : '点击获取随机数'
                }
              </>
            </Else>
          </If>
        </div>
        {/* <div className="home-lotterShow">{randomNumber}</div> */}
        <Button className="home-btn" onClick={this.lotteryClick}>简单摇号示例</Button>
        <Button className="home-btn" onClick={this.commentClick}>讲解</Button>
      </div>
    );
  }
}

export default withRouter(HomePage);
