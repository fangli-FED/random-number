import React, { useState } from 'react';
import { shape, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Button, Checkbox } from 'antd';
import managImg from '../../../../static/managImg.png';

import './index.less';

const classPreix = 'manage';

function ManagePage({ history, t }) {
  const [isAgree, setIsAgree] = useState(false);

  const handleChange = () => {
    setIsAgree(!isAgree);
  };
  const handleClick = () => {
    history.push('/manage/create');
  };

  return (
    <div className={`${classPreix}`}>
      <div className={`${classPreix}-content`}>
        <img src={managImg} alt="" />
        <div
          className={`${classPreix}-title`}
        >
          {t('wheelPro')}
        </div>
        <Button
          type="primary"
          className={`${classPreix}-btn`}
          disabled={!isAgree}
          onClick={handleClick}
        >
          {t('applyCreat')}
        </Button>
        <div className={`${classPreix}-checkbox`}>
          <Checkbox
            checked={isAgree}
            onChange={handleChange}
          >
            {t('readAndAgree')}
            <a
              href="/login"
            >
              {t('platDisclaimer')}
            </a>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

ManagePage.propTypes = {
  history: shape({
    push: func
  }).isRequired,
  t: func.isRequired
};


export default withTranslation()(withRouter(ManagePage));
