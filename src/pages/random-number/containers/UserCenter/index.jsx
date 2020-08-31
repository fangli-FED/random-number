import React from 'react';
import { Button } from 'antd';
import { shape, string, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import { exportCanvanAsPng } from '../../common/utils';
import nightElfUtil from '../../common/nightElfUtil';
import { clearUserInfo } from '../../actions/useInfo';
import './index.less';

const classPreix = 'logout';

function Logout({
  userInfo,
  history,
  clearUserInfo: clearuserinfo,
  t
}) {
  const nightElfUtilInstance = nightElfUtil.getInstace();

  const handleLogout = async () => {
    await nightElfUtilInstance.logout(userInfo.address);

    clearuserinfo();
    sessionStorage.removeItem('userInfo');
    history.push('/login');
  };

  const handleDownQR = () => {
    exportCanvanAsPng('qr-code');
  };

  return (
    <div className={`${classPreix}`}>
      <div className={`${classPreix}-container`}>
        <PageHeader title="个人中心" />
        <PageContainer>
          <div className={`${classPreix}-content`}>
            <div id="qr-code">
              <QRCode value={JSON.stringify(userInfo)} />
            </div>
            <Button
              className={`${classPreix}-btn`}
              onClick={handleDownQR}
            >
              {t('saveQR')}
            </Button>
            <div className={`${classPreix}-address`}>
              <p>address</p>
              <p>{userInfo.address}</p>
            </div>
            <Button
              type="primary"
              onClick={handleLogout}
            >
              {t('logout')}
            </Button>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

Logout.propTypes = {
  userInfo: shape({
    address: string
  }).isRequired,
  history: shape({
    push: func
  }).isRequired,
  clearUserInfo: func.isRequired,
  t: func.isRequired
};

const mapStateToProps = ({ userInfo }) => ({
  ...userInfo
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    clearUserInfo
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

export default wrapper(Logout);
