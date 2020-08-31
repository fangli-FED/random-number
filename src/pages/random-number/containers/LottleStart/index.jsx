import React, { useState } from 'react';
import { shape, func } from 'prop-types';
import { Divider, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import ScrollList from '../../components/ScrollList';
import personnelData from '../../common/personnelData.json';
import { storeRandomList } from '../../actions/randomListInfo';

import './index.less';

const setPersonnelData = personnelData.map((v, i) => ({
  ...v,
  order: {
    en: `NO.${i + 1}`,
    'zh-CN': `第${i + 1}位`
  }
}));

const classPreix = 'lottle-start';

function LottleStart({ history, storeRandomList: setResultList, t }) {
  const [animating, setAnimating] = useState(false);
  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      const random = Math.ceil(Math.random() * setPersonnelData.length);

      setResultList([setPersonnelData[random]]);
      history.push('/lottlery/result/1');
    }, 2000);
  };

  return (
    <div className={classPreix}>
      <div className={`${classPreix}-container`}>
        <PageHeader title="北京市小客车指标公证摇号" />
        <PageContainer>
          <div className={`${classPreix}-content`}>
            <div className={`${classPreix}-title`}>
              <span>
                {t('participantsNumber')}
                ：2000个
              </span>
              <span>
                {t('indicatorsNumber')}
                ：200个
              </span>
            </div>
            <Divider />
            <ScrollList list={setPersonnelData} animated={animating} />
            <div className={`${classPreix}-btn-container`}>
              <Button
                type="primary"
                onClick={handleClick}
              >
                {t('startWheel')}
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

LottleStart.propTypes = {
  history: shape({
    push: func
  }).isRequired,
  storeRandomList: func.isRequired,
  t: func.isRequired
};

const mapStateToProps = ({ randomList }) => ({
  ...randomList
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
  withTranslation(),
  withRouter
);

export default wrapper(LottleStart);
