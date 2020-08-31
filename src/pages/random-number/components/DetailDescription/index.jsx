import React from 'react';
import { number, string, elementType } from 'prop-types';
import { Descriptions } from 'antd';

import './index.less';

const { Item } = Descriptions;

const classPreix = 'detail-desc';

function DetailDesc({
  className,
  title,
  children,
  ...props
}) {
  return (
    <div className={`${classPreix}`}>
      <Descriptions
        title={title}
        className={`${classPreix}-custom`}
        {...props}
      >
        {
          children
        }
      </Descriptions>
    </div>
  );
}

DetailDesc.Item = ({ label, span, children }) => (
  <Item
    label={label}
    span={span}
  >
    {
      children
    }
  </Item>
);

DetailDesc.propTypes = {
  title: elementType.isRequired,
  children: elementType.isRequired,
  className: string,
};

DetailDesc.defaultProps = {
  className: ''
};

DetailDesc.Item.propTypes = {
  label: string.isRequired,
  span: number,
  children: elementType,
};

DetailDesc.Item.defaultProps = {
  span: 1,
  children: <div />
};

export default DetailDesc;
