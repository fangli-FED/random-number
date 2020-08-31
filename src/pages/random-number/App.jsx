/**
 * @file App.jsx
 * @author atom-yang
 */
import React, { useEffect } from 'react';
import {
  HashRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import { func } from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import AuthRoute from './components/Auth';
import {
  setUserInfo,
  getUserInfo
} from './actions/useInfo';
import nightElfUtil from './common/nightElfUtil';
import { ROUTER_LIST } from './route';
import './index.less';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './common/i18n';
import './style/theme.less';

const app = ({
  setUserInfo: setInfo
}) => {
  useEffect(() => {
    nightElfUtil.getInstace();
    if (sessionStorage.getItem('userInfo')) {
      setInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    }
  }, []);
  return (
    <>
      <HashRouter>
        <Navigation />
        <div className="app-content">
          <Switch>
            {
              ROUTER_LIST.map(item => (
                <AuthRoute path={item.path} component={item.component} key={item.path} />
              ))
            }
            <Redirect to={{ pathname: '/login' }} />
          </Switch>
        </div>
        <Footer />
      </HashRouter>
    </>
  );
};

app.propTypes = {
  setUserInfo: func.isRequired
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setUserInfo,
    getUserInfo
  },
  dispatch
);

const wrapper = compose(
  React.memo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
);

export default wrapper(app);
