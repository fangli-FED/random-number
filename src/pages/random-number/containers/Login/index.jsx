import React, { useState, useEffect } from 'react';
import { shape, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Button, message } from 'antd';

import nightElfUtil from '../../common/nightElfUtil';
import { setUserInfo } from '../../actions/useInfo';
import welcomeImg from '../../../../static/welcome.png';

import './index.less';

const classPrefix = 'login';

function Login({
  history,
  setUserInfo: setUser,
  i18n,
  t
}) {
  const [isHasPlug, setIsHasPlug] = useState(false);
  const nightElfUtilInstance = nightElfUtil.getInstace();

  useEffect(() => {
    nightElfUtilInstance
      .pluginCheck()
      .then(data => {
        setIsHasPlug(data);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {};
  }, []);

  async function handleLogin() {
    const loginRes = await nightElfUtilInstance.login();
    if (loginRes.error) {
      message.error(loginRes.errorMessage.message);
      return;
    }

    const detail = JSON.parse(loginRes.detail);
    setUser(detail);
    sessionStorage.setItem('userInfo', JSON.stringify(detail));

    history.push('/homepage');
  }

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-container`}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-leftContent`}>
            <div className={`${classPrefix}-text-aelf`}>{t('sysName')}</div>
            {/* <div className={`${classPrefix}-text-generation`}>{t('generationRandomNumber')}</div> */}
            <If condition={i18n.language !== 'en'}>
              <Then>
                <div className={`${classPrefix}-text-generation-zh`}>Wheeling System</div>
              </Then>
            </If>
          </div>
          <div className={`${classPrefix}-rightContent`}>
            <If condition={!isHasPlug}>
              <Then>
                <div className={`${classPrefix}-no-plug`}>
                  <div className="no-plug-top">
                    <div className={`${classPrefix}-no-plug-title`}>
                      <If condition={i18n.language !== 'en'}>
                        <Then>
                          <h1>插件安装</h1>
                        </Then>
                      </If>
                      <h1>PLUGIN DOWNLOAD</h1>
                    </div>
                    <ul>
                      <li>
                        1.
                        {t('installExtension')}
                        :
                        <a
                          href="https://chrome.google.com/webstore/detail/aelf-explorer-extension-d/mlmlhipeonlflbccli
                          npbmcjdnpnmkpf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${classPrefix}-down-btn`}
                        >
                          {t('down')}
                        </a>
                      </li>
                      <li>
                        2.
                        {t('createWallet')}
                      </li>
                      <li>
                        3.
                        {t('refreshPage')}
                      </li>
                    </ul>
                  </div>
                  <div className="no-plug-bottom">
                    <ul>
                      <li>
                        {t('installPlugInfo1')}
                      </li>
                      <li>
                        {t('installPlugInfo2')}
                      </li>
                    </ul>
                  </div>
                </div>
              </Then>
              <Else>
                <img src={welcomeImg} alt="" width="360" />
                <Button
                  type="primary"
                  onClick={handleLogin}
                >
                  {t('login')}
                </Button>
              </Else>
            </If>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  t: func.isRequired,
  history: shape({
    push: func,
  }).isRequired,
  setUserInfo: func,
  i18n: shape({
    language: string
  }).isRequired,
};

Login.defaultProps = {
  setUserInfo: () => {},
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setUserInfo
  },
  dispatch
);

const wrapper = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withTranslation(),
  withRouter
);

export default wrapper(Login);
