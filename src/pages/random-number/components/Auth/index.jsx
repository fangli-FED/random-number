import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { setUserInfo } from '../../actions/useInfo';
import { isEmptyObject } from '../../common/utils';

const AuthRouter = props => {
  const { component: Component, ...rest } = props;
  const { path, setUserInfo: setInfo } = rest;
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo && isEmptyObject(userInfo)) {
      // log in based on session storage
      setInfo(userInfo);
    }
  }, []);

  const renderProps = innerProps => {
    if (isEmptyObject(userInfo) && path !== '/login') {
      return <Redirect to="/login" />;
    }

    if (!isEmptyObject(userInfo) && path === '/login') {
      return <Redirect to="/lottlery/1" />;
    }

    return <Component {...innerProps} {...rest} />;
  };
  return (
    <Route
      {...rest}
      render={renderProps}
    />
  );
};


AuthRouter.propTypes = {
  component: PropTypes.elementType.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setUserInfo
  },
  dispatch
);

const wrapper = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
);


export default wrapper(AuthRouter);
