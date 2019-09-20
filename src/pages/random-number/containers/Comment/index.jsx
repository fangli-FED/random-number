import React from 'react';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './index.less';

const classPrefix = 'comment';
class Comment extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  historyPush = () => {
    const { history } = this.props;
    history.push('/lottery/begin');
  }

  render() {
    const { t } = this.props;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-thanks`}>{t('commentThanks')}</div>
          <div className={`${classPrefix}-note`}>
            <span className={`${classPrefix}-note-special`}>{t('specialNote')}</span>
            {t('commentNote')}
          </div>
          <button type="button" onClick={this.historyPush} className={`${classPrefix}-btn`}>{t('beginLotBtn')}</button>
        </div>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Comment));
