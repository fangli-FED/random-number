import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Icon } from 'antd';
import { throwttle } from '../../../../common/utils';
// import './index.less';
import navPhoneLogo from '../../../../../../static/footer-logo.png';

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
      location: PropTypes.shape({
        pathname: PropTypes.string
      })
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDrop: false
    };

    this.thorowttleWindwoChange = throwttle(this.windwoChange, 400);
  }


  componentDidMount() {
    document.addEventListener('click', this.handleDrop.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDrop.bind(this), true);
  }

  /**
   * Dropdown Eveent
   * @param {*} e Event Obj
   * @param {*} isNav Distinguish whether the event is triggered by the navigation bar
   */
  handleDrop = (e, isNav) => {
    const dropDom = document.querySelector('.drop-down');
    const { isDrop } = this.state;

    if (isNav) {
      dropDom.style.top = isDrop ? '-200px' : '36px';
      this.setState({
        isDrop: !isDrop
      });
    } else {
      dropDom.style.top = '-200px';
      this.setState({
        isDrop: false
      });
    }
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
    const { isDrop } = this.state;

    let isRandom = true;
    if (history.location.pathname.indexOf('room') > -1) { isRandom = false; }

    return (
      <div className={`${classPrefix}`}>
        <img className={`${classPrefix}-logo`} alt="logo" src={navPhoneLogo} />
        <div className={`${classPrefix}-space`} />
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
          <div className="phone-menu">
            <Icon type={isDrop ? 'close' : 'menu'} onClick={e => this.handleDrop(e, true)} />
            <div className="drop-down">
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
                onClick={() => this.historyPush('room')}
              >
                {t('lottery')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Navigation));
