import React from 'react';
import {
  arrayOf,
  shape,
  string,
  func
} from 'prop-types';
import { Divider, Button } from 'antd';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import { ContentList } from '../../components/ScrollList';
import ListTitle from '../../components/ListTitle';
import './index.less';

const classPreix = 'lottle-result';

function LottleResult({ list, t }) {
  return (
    <div className={`${classPreix}`}>
      <div
        className={`${classPreix}-container`}
      >
        <PageHeader title="北京市小客车指标公证摇号中签名单" />
        <PageContainer>
          <div className={`${classPreix}-content`}>
            <div className={`${classPreix}-title`}>
              <span>
                {t('indicatorsNumber')}
                ：200
              </span>
            </div>
            <Divider />
            <ListTitle />
            <ContentList list={list} />
            <div className={`${classPreix}-btn-container`}>
              <Button>
                {t('wheelAgain')}
              </Button>
              <Button>
                {t('saveWheelResult')}
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

LottleResult.propTypes = {
  list: arrayOf(shape({
    name: string,
  })).isRequired,
  t: func.isRequired
};

const mapStateToProps = ({ randomList }) => ({
  ...randomList
});

const wrapper = compose(
  connect(
    mapStateToProps
  ),
  withTranslation(),
  withRouter
);

export default wrapper(LottleResult);
