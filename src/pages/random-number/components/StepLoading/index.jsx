import React from 'react';
import {
  bool,
  number,
  string,
  arrayOf
} from 'prop-types';
import { If, Then } from 'react-if';
import { withTranslation } from 'react-i18next';
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

function StepLoading({
  condition,
  currentStep,
  steps
}) {
  const CLASS_PREX = 'status-loading';
  return (
    <div className={`${CLASS_PREX}`}>
      <If condition={condition}>
        <Then>
          <div className={`${CLASS_PREX}-status-container`}>
            {
              steps.map((item, index) => (
                <div className={`${CLASS_PREX}-status-item`} key={item}>
                  <p className={getClassBycurrentStep(index, currentStep)}>
                    {item}
                  </p>
                  <If condition={steps.length !== (index + 1)}>
                    <Then>
                      <div className={`${getClassBycurrentStep(index, currentStep)} circle`} />
                    </Then>
                  </If>
                </div>
              ))
            }
          </div>
          <div className={`${CLASS_PREX}-blur`} />
        </Then>
      </If>
    </div>
  );
}

StepLoading.propTypes = {
  condition: bool,
  currentStep: number,
  steps: arrayOf(string).isRequired,
};

StepLoading.defaultProps = {
  condition: true,
  currentStep: 0,
};

export default withTranslation()(StepLoading);
