import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { If, Then } from 'react-if';
import { withTranslation } from 'react-i18next';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearUserInfo } from '../../../../actions/useInfo';
import { isEmptyObject } from '../../../../common/utils';
import nightElfUtil from '../../../../common/nightElfUtil';
import navLogo from '../../../../../../static/nav-logo.png';
import MENU_DATA from '../../menu';
import './index.less';

const { Item } = Menu;

const classPrefix = 'navigation';

class Navigation extends React.Component {
  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func,
      language: PropTypes.string
    }).isRequired,
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
      push: PropTypes.func,
      location: PropTypes.shape({
        pathname: PropTypes.string
      })
    }).isRequired,
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
    }).isRequired,
    clearUserInfo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
    };

    this.nightElfUtilInstance = nightElfUtil.getInstace();
  }

  historyPush = path => {
    const { history } = this.props;
    history.replace({ pathname: `${path}` });
    // history.replace({pathname:path});
  }

  changeLanguage = nextLanguage => {
    const { i18n } = this.props;
    i18n.changeLanguage(nextLanguage);
  }

  handleLogout = async () => {
    const { userInfo, history, clearUserInfo: clearInfo } = this.props;
    await this.nightElfUtilInstance.logout(userInfo.address);

    clearInfo();
    sessionStorage.removeItem('userInfo');
    history.push('/login');
  }

  render() {
    const {
      t,
      i18n,
      history,
      userInfo
    } = this.props;

    const { language: rightLanguage } = i18n;

    let menuType = 'lottle';
    if (history.location.pathname.indexOf('/manage') > -1) { menuType = 'manage'; }

    return (
      <div className={`${classPrefix}`}>
        <img className={`${classPrefix}-logo`} alt="logo" src={navLogo} />
        <div
          className={`${classPrefix}-content ${isEmptyObject(userInfo) ? `${classPrefix}-content-no-login` : ''}`}
        >
          <If condition={!isEmptyObject(userInfo)}>
            <Then>
              <div className={`${classPrefix}-menu-left`}>
                {
                  MENU_DATA[menuType].left.map(item => (
                    <button
                      key={item.path}
                      type="button"
                      className={`${classPrefix}-menu-item button-style-clear 
                        ${item.children.includes(history.location.pathname) ? 'routerActive' : ''}`}
                      onClick={() => this.historyPush(item.path)}
                    >
                      {t(item.name)}
                    </button>
                  ))
                }
              </div>
              <div className={`${classPrefix}-menu-right`}>
                {
                  MENU_DATA[menuType].right.map(item => (
                    <button
                      key={item.path}
                      type="button"
                      className={`${classPrefix}-menu-item button-style-clear 
                        ${item.children.includes(history.location.pathname) ? 'routerActive' : ''}`}
                      onClick={() => this.historyPush(item.path)}
                    >
                      {t(item.name)}
                    </button>
                  ))
                }
              </div>
            </Then>
          </If>
          <div className={`${classPrefix}-menu-func-area`}>
            <div
              className={`${classPrefix}-i18n`}
            >
              <button
                type="button"
                className={`${rightLanguage === 'en' ? '' : 'activeColor'} button-style-clear`}
                onClick={() => { this.changeLanguage('zh-CN'); }}
              >
                中
              </button>
              /
              <button
                type="button"
                className={`${rightLanguage === 'en' ? 'activeColor' : ''} button-style-clear`}
                onClick={() => { this.changeLanguage('en'); }}
              >
                En
              </button>
            </div>
            <If condition={!isEmptyObject(userInfo)}>
              <Then>
                <div className={`${classPrefix}-user`}>
                  <Dropdown overlay={
                    (
                      <Menu>
                        <Item>
                          <Link to="/manage/usercenter">
                            {t('userCenter')}
                          </Link>
                        </Item>
                        <Item onClick={this.handleLogout}>
                          {t('logout')}
                        </Item>
                      </Menu>
                    )}
                  >
                    <p className={`${classPrefix}-user-name`}>{userInfo.name}</p>
                  </Dropdown>
                </div>
              </Then>
            </If>
          </div>
        </div>
      </div>
    );
  }
}

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

export default wrapper(Navigation);
