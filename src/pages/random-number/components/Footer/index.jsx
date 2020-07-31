import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
  Popover,
  Icon
} from 'antd';
import {
  redditIcon
} from '../../common/icons';
import './index.less';
import aelfPublicNumber from '../../../../static/aelf-public-number.jpg';
import footerLogo from '../../../../static/footer-logo.png';

const classPrefix = 'footer';

const icons = [
  {
    id: 1,
    name: 'twitter',
    icon: 'twitter',
    link: 'https://twitter.com/aelfblockchain'
  },
  {
    id: 2,
    name: 'facebook',
    icon: 'facebook',
    link: 'https://www.facebook.com/aelfofficial/'
  },
  {
    id: 3,
    name: 'github',
    icon: 'github',
    link: 'https://github.com/AElfProject'
  },
  {
    id: 4,
    name: 'reddit',
    icon: redditIcon,
    link: 'https://www.reddit.com/r/aelfofficial/'
  },
  {
    id: 5,
    name: 'youtube',
    icon: 'youtube',
    link: 'https://www.youtube.com/c/aelfblockchain'
  },
  {
    id: 6,
    name: 'wechat',
    icon: 'wechat',
    link: '#'
  },
];

const iconMap = data => {
  const { id, icon: IconName, link } = data;
  if (data.name === 'wechat') {
    return (
      <Popover
        key={id}
        className={`${classPrefix}-icon`}
        placement="top"
        trigger="click"
        content={(<img alt="qr code" className={`${classPrefix}-publicNumber`} src={aelfPublicNumber} />)}
      >
        <Icon type={IconName} />
      </Popover>
    );
  }
  return (
    <a href={link} key={id} className={`${classPrefix}-icon`}>
      {typeof IconName === 'string' ? <Icon type={IconName} /> : <IconName />}
    </a>
  );
};

class Footer extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string
      })
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t, history } = this.props;
    let isRandom = true;
    if (history.location.pathname.indexOf('room') > -1) { isRandom = false; }
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
