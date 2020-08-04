import React from 'react';
import {
  bool,
  number,
  func,
  element
} from 'prop-types';
import { If, Then } from 'react-if';
import { withTranslation } from 'react-i18next';
import { STATUS } from './status';
import './index.less';

function getClassBycurrentStep(index, currentStep) {
  if (index < currentStep) {
    return 'finish';
  }

  if (index === currentStep) {
    return 'active';
  }

  return '';
}

function StatusLoading({
  children,
  condition,
  currentStep,
  t
}) {
  const CLASS_PREX = 'status-loading';
  return (
    <div className={`${CLASS_PREX}`}>
      <If condition={condition}>
        <Then>
          <div className={`${CLASS_PREX}-status-container`}>
            {
              STATUS.map((item, index) => (
                <div className={`${CLASS_PREX}-status-item`} key={item}>
                  <p className={getClassBycurrentStep(index, currentStep)}>
                    {t(`${item}`)}
                  </p>
                  <If condition={STATUS.length !== (index + 1)}>
                    <Then>
                      <div className={`${getClassBycurrentStep(index, currentStep)} circle`} />
                    </Then>
                  </If>
                </div>
              ))
            }
          </div>
        </Then>
      </If>
      <div
        className={condition ? `${CLASS_PREX}-container ${CLASS_PREX}-blur` : `${CLASS_PREX}-container`}
      >
        {children}
      </div>
    </div>
  );
}

StatusLoading.propTypes = {
  condition: bool,
  currentStep: number,
  t: func.isRequired,
  children: element
};

StatusLoading.defaultProps = {
  condition: true,
  currentStep: 0,
  children: (<div />)
};

export default withTranslation()(StatusLoading);
