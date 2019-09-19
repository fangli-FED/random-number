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
import './index.less';
// import AuthRoute from './components/Auth';
import HomePage from './containers/HomePage';
import Lottery from './containers/Lottery';
import Comment from './containers/Comment';
import Begin from './containers/Begin';
import Selected from './containers/Selected';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './common/i18n';

const app = () => (
  <>
    <HashRouter>
      <Navigation />
      <div className="app-content">
        <Switch>
          <Route path="/lottery/comment" component={Comment} />
          <Route path="/lottery/begin" component={Begin} />
          <Route path="/lottery/selected" component={Selected} />
          <Route path="/lottery" component={Lottery} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
      <Footer />
    </HashRouter>
  </>
);
export default React.memo(app);
