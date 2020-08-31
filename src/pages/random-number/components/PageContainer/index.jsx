import React from 'react';
import {
  oneOfType,
  element,
  elementType,
  string
} from 'prop-types';

import './index.less';

const classPreix = 'page-container';

function PageContainer({ children, className }) {
  return (
    <div className={`${classPreix} ${className}`}>
      {children}
    </div>
  );
}

PageContainer.propTypes = {
  children: oneOfType([
    elementType,
    element
  ]),
  className: string
};

PageContainer.defaultProps = {
  children: (<div />),
  className: ''
};

export default PageContainer;
