import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import '../../common/icons';
import './index.less';
import aelfPublicNumber from '../../../../static/aelf-public-number.jpg';
import footerLogo from '../../../../static/footer-logo.png';

const classPrefix = 'footer';

const icons = [
  {
    id: 1,
    name: 'twitter',
    icon: ['fab', 'twitter'],
    link: 'https://twitter.com/aelfblockchain'
  },
  {
    id: 2,
    name: 'facebook',
    icon: ['fab', 'facebook'],
    link: 'https://www.facebook.com/aelfofficial/'
  },
  {
    id: 3,
    name: 'github',
    icon: ['fab', 'github'],
    link: 'https://github.com/aelfProject'
  },
  {
    id: 4,
    name: 'reddit',
    icon: ['fab', 'reddit'],
    link: 'https://www.reddit.com/r/aelfofficial/'
  },
  {
    id: 5,
    name: 'youtube',
    icon: ['fab', 'youtube'],
    link: 'https://www.youtube.com/c/aelfblockchain'
  },
  {
    id: 6,
    name: 'weixin',
    icon: ['fab', 'weixin'],
    link: '#'
  },
];

const iconMap = data => {
  const { id, icon, link } = data;
  if (data.name === 'weixin') {
    return (
      <Popover
        key={id}
        className={`${classPrefix}-icona`}
        placement="top"
        trigger="click"
        content={(<img alt="qr code" className={`${classPrefix}-publicNumber`} src={aelfPublicNumber} />)}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`${classPrefix}-icon`}
        />
      </Popover>
    );
  }
  return (
    <a href={link} key={id} className={`${classPrefix}-icona`}>
      <FontAwesomeIcon
        icon={icon}
        className={`${classPrefix}-icon`}
      />
    </a>
  );
};

class Footer extends React.Component {
  static defaultProps = {
    // className: null
  }

  static propTypes = {
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
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

  render() {
    const { t, history } = this.props;
    let isRandom = true;
    if (history.location.pathname.indexOf('lottery') > -1) { isRandom = false; }
    return (
      <div className={`${classPrefix} ${isRandom ? '' : `${classPrefix}-lottery`}`}>
        <div className={`${classPrefix}-leftContent`}>
          <img className={`${classPrefix}-aelfImg`} alt="aelf logo" src={footerLogo} />
          <div className={`${classPrefix}-introduce`}>{t('introduce')}</div>
        </div>
        <div className={`${classPrefix}-rightContent`}>
          <span className={`${classPrefix}-contact`}>{`${t('contactUs')}:`}</span>
          {icons.map(iconMap)}
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Footer));
