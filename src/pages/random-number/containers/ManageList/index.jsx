import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { func } from 'prop-types';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import './index.less';
// TODO: 删除
import dataSource from './data';

const classPreix = 'manage-list';

function ManageList({ t }) {
  const columns = [
    {
      title: t('projectId'),
      dataIndex: 'projectId',
      key: 'projectId'
    },
    {
      title: t('wheelTheme'),
      dataIndex: 'lottleTitle',
      key: 'lottleTitle'
    },
    {
      title: t('createTime'),
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: t('wheelCode'),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>{record.status ? t('lotteried') : t('lottery')}</span>
      )
    },
    {
      title: t('projectDetail'),
      dataIndex: 'detail',
      key: 'detail',
      render: () => (
        <Link to="/homepage">{t('details')}</Link>
      )
    },
    {
      title: t('actions'),
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="link"
          disabled={record.status}
        >
          {record.isOpen ? t('open') : t('close')}
        </Button>
      )
    },
  ];

  const [searchValue, setSearchValue] = useState('');
  let search = '';

  const handleChanageSearch = e => {
    setSearchValue(e.target.value);
  };

  const handleSearchData = () => {
    search = searchValue;

    console.log(search);
  };

  return (
    <div className={`${classPreix}`}>
      <div className={`${classPreix}-container`}>
        <PageHeader title={t('notarizedLotteryEntriesList')} />
        <PageContainer>
          <div className={`${classPreix}-search`}>
            <span className={`${classPreix}-search-title`}>
              {t('idTheme')}
            </span>
            <Input
              className={`${classPreix}-search-input`}
              value={searchValue}
              placeholder={t('inputProjectOrId')}
              onChange={handleChanageSearch}
            />
            <Button
              type="primary"
              onClick={handleSearchData}
            >
              {t('search')}
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              showQuickJumper: true,
              showTotal: total => (`共${total}条数据`)
            }}
          />
        </PageContainer>
      </div>
    </div>
  );
}

ManageList.propTypes = {
  t: func.isRequired
};

export default withTranslation()(ManageList);
