import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { func } from 'prop-types';
import { Tabs } from 'antd';
import { withTranslation } from 'react-i18next';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import BaseInfo from './component/BaseInfo';
import DataInfo from './component/DataInfo';
import RuleInfo from './component/RuleInfo';
import ResultInfo from './component/ResultInfo';
import './index.less';

const { TabPane } = Tabs;

const classPreix = 'create-project';
const KEY_ARR = ['baseInfo', 'dataInfo', 'ruleInfo', 'complate'];

let formData = {};
let currentStep = 0;

function Create({ t }) {
  const [curretKey, setCurrentKey] = useState('baseInfo');

  const handleNext = (value = {}, isLast) => {
    formData = Object.assign(formData, value);
    if (!isLast) {
      console.log(formData);
    }

    currentStep += 1;
    setCurrentKey(KEY_ARR[currentStep]);
  };

  const handleChangeTab = activeKey => {
    setCurrentKey(activeKey);
  };

  const tabArr = [
    {
      title: t('baseInfo'),
      key: 'baseInfo',
      Comp: (<BaseInfo onClick={handleNext} formData={formData} />)
    },
    {
      title: t('dataInfo'),
      key: 'dataInfo',
      Comp: (<DataInfo onClick={handleNext} formData={formData} />)
    },
    {
      title: t('ruleInfo'),
      key: 'ruleInfo',
      Comp: (<RuleInfo onClick={handleNext} formData={formData} />)
    },
    {
      title: t('finish'),
      key: 'complate',
      Comp: (<ResultInfo />)
    }
  ];

  return (
    <div className={`${classPreix}`}>
      <div className={`${classPreix}-container`}>
        <PageHeader title={t('projectSetting')} />
        <PageContainer>
          <Tabs
            activeKey={curretKey}
            tabPosition="left"
            className="tab"
            onChange={
              handleChangeTab
            }
          >
            {
              tabArr.map((item, index) => (
                <TabPane
                  tab={item.title}
                  key={item.key}
                  disabled={index > currentStep || (currentStep === 3 && index !== 3)}
                >
                  {item.Comp}
                </TabPane>
              ))
            }
          </Tabs>
        </PageContainer>
      </div>
    </div>
  );
}

Create.propTypes = {
  t: func.isRequired,
};

export default withTranslation()(withRouter(Create));
