import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Button, message
} from 'antd';
import AElf from 'aelf-sdk';
import { localHttp, mnemonic, randomDemoContractName } from '../../../../common/constants';
import { sleep, listIndexSet } from '../../common/publicFunc';
import personnelData from '../../common/personnelData.json';
import { storeRandomList } from '../../actions/randomListInfo';
import ListTitle from '../../components/ListTitle';
import ScrollList from '../../components/ScrollList';
import './index.less';

const setPersonnelData = listIndexSet(personnelData);
const dataLength = setPersonnelData.length;
const leftData = setPersonnelData.slice(0, dataLength / 2);
const rightData = setPersonnelData.slice(dataLength / 2, dataLength);

const classPrefix = 'begin';

class Begin extends React.Component {
  static defaultProps = {
    storeRandomList: () => {}
  }

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    storeRandomList: PropTypes.func,
    t: PropTypes.func.isRequired,
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
        .then(zeroC => zeroC.GetContractAddressByName.call(sha256(randomDemoContractName)))
        .then(helloWorldAddress => aelf.chain.contractAt(helloWorldAddress, wallet))
        .then(helloWorldContract => {
          this.helloWorldContract = helloWorldContract;
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }

  componentWillUnmount() {
    this.setState({
      animating: false
    });
  }

  getList = async (requestRetValue, frequency, sign) => {
    let getListReadableData = null;
    // request和get randomlist 中间需要一定时间间隔, 根据c#开发人员推荐为4s,之后可以根据实际情况进行调整。
    await sleep(4000);
    try {
      const getRandomTId = await this.helloWorldContract.GetRandomList(requestRetValue.tokenHash);

      // 获取getrandomlist的返回数据，必须等待一定时间，失败抛出错误
      await sleep(1000);
      let getRandomData = this.aelf.chain.getTxResult(getRandomTId.TransactionId);
      if (getRandomData.Status !== 'MINED') {
        await sleep(3000);
        getRandomData = await this.aelf.chain.getTxResult(getRandomTId.TransactionId);
        if (getRandomData.Status !== 'MINED') {
          throw new Error({ Status: '获取数据失败' });
        }
      }

      // console.log('getRandomData', getRandomData);
      if (getRandomData.Status === 'MINED') {
        // 成功获取，返回数据
        this.setState({
          animating: false
        });
        getListReadableData = JSON.parse(getRandomData.ReadableReturnValue).List;
        const { storeRandomList: storeList, history } = this.props;
        // 存储数据到redux，selected页面通过redux获取，选中数据。
        storeList(getListReadableData);
        history.push('/lottery/selected');
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
        message.error('请重试');
      } else {
        // 重新获取并只重新获取一次,第二次直接报错
        this.lotteryClick(true);
      }
    }
  }

  lotteryClick = async sign => {
    this.setState({
      animating: true
    });

    if (this.helloWorldContract === null) {
      // 如果componentDidMount里面还未获取到contract 实利，等待2s 才能进行合约的获取，可根据链的实际情况做修改.
      await sleep(2000);
    }

    try {
      // 发送获取随机数的请求
      const requestListTId = await this.helloWorldContract.RequestRandomList({
        List: personnelData,
        Number: 5
      });

      // 等一段时间后可以拿到,4s可以拿到，但有些时候时间短一些，第一次未获取到再获取一次。
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
    const { t } = this.props;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-title`}>
            {`${t('Building')}-${t('beginLot')}`}
          </div>
          <div className={`${classPrefix}-hr`} />
          <div className={`${classPrefix}-list`}>
            <div className={`${classPrefix}-list-title`}>
              <div className={`${classPrefix}-list-left`}>
                <ListTitle key="leftTitle" />
              </div>
              <div className={`${classPrefix}-list-right`}>
                <ListTitle key="rightTitle" />
              </div>
            </div>
            <div className={`${classPrefix}-list-content`}>
              <div className={`${classPrefix}-list-left`}>
                <ScrollList key="left" scroll={animating} list={leftData} />
              </div>
              <div className={`${classPrefix}-list-right`}>
                <ScrollList key="right" scroll={animating} list={rightData} setIndex={false} />
              </div>
            </div>
          </div>
          <Button
            type="primary"
            onClick={this.lotteryClick}
            className={`${classPrefix}-btn`}
            disabled={animating}
          >
            {t('beginLotBtn')}
          </Button>
        </div>
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
