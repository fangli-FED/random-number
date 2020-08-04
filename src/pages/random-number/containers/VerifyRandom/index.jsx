import React from 'react';
import { withRouter } from 'react-router-dom';
import { func, object, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Divider, Button } from 'antd';
import { verifyWeb } from '../../../../common/constants';
import './index.less';

const classPrefix = 'verify';

function VerifyRandom(props) {
  const { location } = props;
  const { t } = props;
  const data = location.state || JSON.parse(sessionStorage.getItem('verifyData')) || {};

  function handlConfirmClick() {
    const { history } = props;

    sessionStorage.removeItem('verifyData');

    history.push({
      pathname: '/',
      state: {
        ...data
      }
    });
  }

  return (
    <>
      <div className={`${classPrefix}`}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-base-info`}>
            <div className={`${classPrefix}-num-info`}>
              <p>
                <span className="bold">{t('minNumber')}</span>
                :
                {data.minNumber}
              </p>
              <p>
                <span className="bold">{t('maxNumber')}</span>
                :
                {data.maxNumber}
              </p>
            </div>
            <p>
              <span className="bold">{t('random')}</span>
              :
              {data.randomNumber}
            </p>
          </div>
          <Divider />
          <div className={`${classPrefix}-detail`}>
            <div className={`${classPrefix}-detail-content`}>
              <div className={`${classPrefix}-detail-value`}>
                <p>
                  {t('requestBlockHeight')}
                  :
                </p>
                <p>
                  <a
                    rel="noopener noreferrer"
                    href={`${verifyWeb}/block/${data.requestBlockHeight}`}
                    target="_blank"
                  >
                    {data.requestBlockHeight}
                  </a>
                </p>
              </div>
              <div className={`${classPrefix}-detail-value`}>
                <p>
                  {t('randomBlockHeight')}
                  :
                </p>
                <p>
                  <a
                    rel="noopener noreferrer"
                    href={`${verifyWeb}/block/${data.randomBlockHeight}`}
                    target="_blank"
                  >
                    {data.randomBlockHeight}
                  </a>
                </p>
              </div>
              <div className={`${classPrefix}-detail-value`}>
                <p>
                  {t('currentBlockHeight')}
                  :
                </p>
                <p>
                  <a
                    rel="noopener noreferrer"
                    href={`${verifyWeb}/block/${data.currentBlockHeight}`}
                    target="_blank"
                  >
                    {data.currentBlockHeight}
                  </a>
                </p>
              </div>
              <div className={`${classPrefix}-detail-value`}>
                <p>
                  {t('playId')}
                  :
                </p>
                <p>
                  <a
                    rel="noopener noreferrer"
                    href={`${verifyWeb}/tx/${data.playId}`}
                    target="_blank"
                  >
                    {data.playId}
                  </a>
                </p>
              </div>
              <div className={`${classPrefix}-detail-value`}>
                <p>
                  {t('hash')}
                  :
                </p>
                <p>{data.hash}</p>
              </div>
              <p className={`${classPrefix}-desc`}>
                {
                  t('desc')
                }
              </p>
              <Button
                type="primary"
                className={`${classPrefix}-detail-btn`}
                onClick={handlConfirmClick}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

VerifyRandom.propTypes = {
  t: func.isRequired,
  location: shape({
    state: object
  }),
  history: shape({
    push: func
  }).isRequired
};

VerifyRandom.defaultProps = {
  location: {}
};

export default withRouter(withTranslation()(VerifyRandom));
