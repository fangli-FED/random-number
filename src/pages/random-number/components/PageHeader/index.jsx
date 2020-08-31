import React from 'react';
import { string } from 'prop-types';

import './index.less';

const classPrefix = 'page-header';

function PageHeader({ title }) {
  return (
    <div className={`${classPrefix}`}>
      <h1>{title}</h1>
      <div className={`${classPrefix}-line`} />
    </div>
  );
}

PageHeader.propTypes = {
  title: string.isRequired
};

export default PageHeader;
