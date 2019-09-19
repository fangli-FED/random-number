import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
// import {
//   Button, ActivityIndicator, Toast
// } from 'antd-mobile';
import AElf from 'aelf-sdk';
import { localHttp, mnemonic, helloWorldContractName } from '../../../../common/constants';
import { sleep, listIndexSet } from '../../common/publicFunc';
import personnelData from '../../common/personnelData.json';
import { storeRandomList } from '../../actions/randomListInfo';
// import ScrollList from '../../components/ScrollList';
import './index.less';

const showData = listIndexSet(personnelData);

// const param = ['index', 'name', 'number'];

// 遍历列表头
// const nameMapping = (data, index) => (
//   <div className={`lottery-line-${param[index]}`} key={data}>{data}</div>
// );

class Begin extends React.Component {
  static defaultProps = {
    storeRandomList: () => {}
  }

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    storeRandomList: PropTypes.func,
    // t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.helloWorldContract = null;
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
        .then(zeroC => zeroC.GetContractAddressByName.call(sha256(helloWorldContractName)))
        .then(helloWorldAddress => aelf.chain.contractAt(helloWorldAddress, wallet))
        .then(helloWorldContract => {
          this.helloWorldContract = helloWorldContract;
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }

  getList = async (requestRetValue, frequency, sign) => {
    let getListReadableData = null;
    await sleep(4000);
    try {
      const getRandomTId = await this.helloWorldContract.GetRandomList(requestRetValue.tokenHash);

      // 获取getrandomlist的返回数据，失败抛出错误
      await sleep(1000);
      let getRandomData = this.aelf.chain.getTxResult(getRandomTId.TransactionId);
      if (getRandomData.Status !== 'MINED') {
        await sleep(3000);
        getRandomData = await this.aelf.chain.getTxResult(getRandomTId.TransactionId);
        if (getRandomData.Status !== 'MINED') {
          throw new Error({ Status: '获取数据失败' });
        }
      }

      console.log('getRandomData', getRandomData);
      if (getRandomData.Status === 'MINED') {
        // 成功获取，返回数据
        getListReadableData = JSON.parse(getRandomData.ReadableReturnValue).List;
        const { storeRandomList: storeList, history } = this.props;
        storeList(getListReadableData);
        this.setState({
          animating: false
        });
        history.push('/selected');
      }
    } catch (err) {
      console.log(err, frequency);
      if (err.Status !== 'MINED' && frequency < 10) {
        // get等待时间过短重新发送请求，超过10次认为失败
        const nextFrequency = frequency + 1;
        await this.getList(requestRetValue, nextFrequency);
      } else if (sign) {
        // 第二次发送随机数请求并获取失败，报错
        this.setState({
          animating: false
        });
        // Toast.info('请重试');
      } else {
        // 重新获取一次
        this.lotteryClick(true);
      }
    }
  }

  lotteryClick = async sign => {
    this.setState({
      animating: true
    });

    if (this.helloWorldContract === null) {
      await sleep(2000);
    }

    try {
      const requestListTId = await this.helloWorldContract.RequestRandomList({
        List: showData,
        Number: 5
      });

      await sleep(1000);
      let requestReturnData = await this.aelf.chain.getTxResult(requestListTId.TransactionId);
      if (requestReturnData.Status !== 'MINED') {
        await sleep(3000);
        requestReturnData = await this.aelf.chain.getTxResult(requestListTId.TransactionId);
      }

      const requestRetValue = JSON.parse(requestReturnData.ReadableReturnValue);

      await this.getList(requestRetValue, 0, sign);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { animating } = this.state;
    console.log(animating);
    // const { t } = this.props;
    // const paramName = [t('index'), t('name'), t('number')];
    return (
      <div className="lottery">
        {/* <div className="lottery-content">
          <div className="lottery-line">
            {paramName.map(nameMapping)}
          </div>
          <ScrollList list={personnelData} />
        </div>
        <Button className="lottery-btn" onClick={this.lotteryClick} disabled={animating}>点击摇号</Button>

        <ActivityIndicator
          toast
          text="Loading..."
          animating={animating}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    storeRandomList
  },
  dispatch
);

const wrapper = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withTranslation(),
);

export default wrapper(Begin);
