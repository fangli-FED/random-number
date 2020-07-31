import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './index.less';

const classPrefix = 'comment';

const Comment = props => {
  const [t] = useTranslation();
  const { history } = props;
  function historyPush() {
    history.push('/room/begin');
  }
  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>
        <div className={`${classPrefix}-thanks`}>{t('commentThanks')}</div>
        <div className={`${classPrefix}-note`}>
          <span className={`${classPrefix}-note-special`}>{t('specialNote')}</span>
          {t('commentNote')}
        </div>
        <button type="button" onClick={() => historyPush()} className={`${classPrefix}-btn`}>{t('beginLotBtn')}</button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};

export default withRouter(Comment);
