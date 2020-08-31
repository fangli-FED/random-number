import React from 'react';
import { func } from 'prop-types';
import { Result, Button } from 'antd';
import { withTranslation } from 'react-i18next';

const classPriex = 'result-info';

function ResultInfo({ t }) {
  return (
    <div className={`${classPriex}`}>
      <Result
        status="success"
        title={t('successfulCreate')}
        subTitle={t('successfulCreateDesc')}
        extra={
          <Button type="primary">{t('projectDetail')}</Button>
        }
      />
    </div>
  );
}

ResultInfo.propTypes = {
  t: func.isRequired
};

export default withTranslation()(ResultInfo);
