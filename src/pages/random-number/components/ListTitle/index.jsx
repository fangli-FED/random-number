import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './index.less';
// const param = ['index', 'name', 'number'];

const nameMapping = data => (
  <div className="list-title" key={data}>{data}</div>
);
const ListTitle = props => {
  const { t } = props;
  const paramName = [t('index'), t('name'), t('number')];
  return (
    <>
      {paramName.map(nameMapping)}
    </>
  );
};

ListTitle.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(ListTitle);
