import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { If, Then } from 'react-if';
import PropTypes from 'prop-types';
import './index.less';

const classPrefix = 'lottery';

class Lottery extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      language: PropTypes.string,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  historyPush = () => {
    const { history } = this.props;
    history.push('/room/comment');
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-Building`}>{t('Building')}</div>
          <div
            className={`${classPrefix}-lotSystem ${i18n.language === 'en' ? `${classPrefix}-lotSystem-en` : ''}`}
          >
            {t('lotSystem')}
          </div>
          <If condition={i18n.language !== 'en'}>
            <Then>
              <div className={`${classPrefix}-lotSystem-zh`}>The System of House Selection & Lot Number</div>
            </Then>
          </If>
          <button className={`${classPrefix}-lotBtn`} type="button" onClick={this.historyPush}>
            {t('lotNumber')}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Lottery));
