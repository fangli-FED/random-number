import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

const allPath = ['lottery', 'comment', 'selected'];

const AuthRouter = props => {
  const { component: Component, ...rest } = props;
  const { path } = rest;

  const renderProps = innerProps => {
    if (allPath.indexOf(path) === -1) {
      return <Redirect to="/" />;
    }
    return <Component path={path} {...innerProps} {...rest} />;
  };

  return (
    <Route {...rest} render={renderProps} />
  );
};

AuthRouter.defaultProps = {
  path: '/'
};

AuthRouter.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string
};

export default AuthRouter;
