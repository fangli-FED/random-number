import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  Button,
  message,
  Divider
} from 'antd';
import AElf from 'aelf-sdk';
import {
  END_POINT,
  mnemonic,
  // randomDemoContractName,
  randomAddress
} from '../../../../common/constants';
import { sleep } from '../../common/utils';
import personnelData from '../../common/personnelData.json';
import { storeRandomList } from '../../actions/randomListInfo';
import ScrollList from '../../components/ScrollList';
import './index.less';

const setPersonnelData = personnelData.map((v, i) => ({
  ...v,
  order: {
    en: `NO.${i + 1}`,
    zh: `第${i + 1}位`
  }
}));

const classPrefix = 'begin';

class Begin extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    storeRandomList: PropTypes.func,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    storeRandomList: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.randomContract = null;
  }

  componentDidMount() {
    const aelf = new AElf(new AElf.providers.HttpProvider(END_POINT));
    this.aelf = aelf;
    // const { sha256 } = AElf.utils;
    const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);
    aelf.chain.getChainStatus()
      // .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
      // .then(zeroC => zeroC.GetContractAddressByName.call(sha256(randomDemoContractName)))
      .then(() => aelf.chain.contractAt(randomAddress, wallet))
      .then(randomContract => {
        this.randomContract = randomContract;
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  componentWillUnmount() {
    this.setState({
      animating: false
    });
  }

  lotteryClick = async () => {
    const aRandom = [];
    this.setState({
      animating: true
    });

    if (this.randomContract) {
      await sleep(2000);
    }

    try {
      const { random } = await this.randomContract.GetRandomNumber.call({
        min: 1,
        max: setPersonnelData.length
      });

      aRandom.push(parseInt(random, 10));

      while (aRandom.length < 5) {
        const otherRandom = Math.ceil(Math.random() * setPersonnelData.length);

        if (!aRandom.includes(otherRandom)) {
          aRandom.push(otherRandom);
        }
      }

      const { storeRandomList: storeList, history } = this.props;
      // 存储数据到redux，selected页面通过redux获取，选中数据。
      storeList(setPersonnelData.filter((item, index) => aRandom.includes(index)));
      history.push('/lottery/selected');
    } catch (err) {
      message.error(err.detail);
    }
  };

  render() {
    const { animating } = this.state;
    const { t } = this.props;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-title`}>
            {`${t('Building')}-${t('beginLot')}`}
          </div>
          <Divider />
          <ScrollList list={setPersonnelData} animated={animating} />
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
