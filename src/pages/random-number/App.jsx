/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { } from 'antd-mobile';
import './index.less';
// import AuthRoute from './components/Auth';
import HomePage from './containers/HomePage';
import Lottery from './containers/Lottery';
import Comment from './containers/Comment';
import Selected from './containers/Selected';

const app = () => (
  <HashRouter>
    <Switch>
      {/* <Route path="/homepage" component={HomePage} /> */}
      <Route path="/lottery" component={Lottery} />
      <Route path="/comment" component={Comment} />
      <Route path="/selected" component={Selected} />
      <Route path="/" component={HomePage} />
    </Switch>
  </HashRouter>
);
export default React.memo(app);
