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
import HomePage from './containers/HomePage';
import Lottery from './containers/Lottery';
import Comment from './containers/Comment';
import Begin from './containers/Begin';
import Selected from './containers/Selected';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Verify from './containers/VerifyRandom';
import './common/i18n';

const app = () => (
  <>
    <HashRouter>
      <Navigation />
      <div className="app-content">
        <Switch>
          <Route path="/room/comment" component={Comment} />
          <Route path="/room/begin" component={Begin} />
          <Route path="/room/selected" component={Selected} />
          <Route path="/room" component={Lottery} />
          <Route path="/verify" component={Verify} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
      <Footer />
    </HashRouter>
  </>
);
export default React.memo(app);
