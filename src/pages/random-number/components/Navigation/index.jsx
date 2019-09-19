import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './index.less';
import navLogo from '../../../../static/nav-logo.png';

const classPrefix = 'navigation';

class Navigation extends React.Component {
  static defaultProps = {
    // className: null
  }

  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func,
      language: PropTypes.string
    }).isRequired,
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
      location: PropTypes.shape({
        pathname: PropTypes.string
      })
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  historyPush = path => {
    const { history } = this.props;
    history.replace({ pathname: `/${path}` });
    // history.replace({pathname:path});
  }

  changeLanguage = nextLanguage => {
    const { i18n } = this.props;
    i18n.changeLanguage(nextLanguage);
  }

  render() {
    const { t, i18n, history } = this.props;
    const { language: rightLanguage } = i18n;

    let isRandom = true;
    if (history.location.pathname.indexOf('lottery') > -1) { isRandom = false; }

    return (
      <div className={`${classPrefix}`}>
        <img className={`${classPrefix}-logo`} alt="logo" src={navLogo} />
        <button
          type="button"
          className={`${classPrefix}-randomNumber button-style-clear ${isRandom ? 'routerActive' : ''}`}
          onClick={() => this.historyPush('HomePage')}
        >
          {t('randomNumber')}
        </button>
        <button
          type="button"
          className={`${classPrefix}-lottery button-style-clear ${isRandom ? '' : 'routerActive'}`}
          onClick={() => this.historyPush('lottery')}
        >
          {t('lottery')}
        </button>
        <div className={`${classPrefix}-space`} />
        <div
          className={`${classPrefix}-i18n`}
        >
          <button
            type="button"
            className={`${rightLanguage === 'en' ? '' : 'activeColor'} button-style-clear`}
            onClick={() => { this.changeLanguage('zh'); }}
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
      </div>
    );
  }
}

export default withRouter(withTranslation()(Navigation));
