import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import {
  Input,
  Button,
  Table,
  Upload
} from 'antd';
import { withTranslation } from 'react-i18next';

import PageHeader from '../../components/PageHeader';
import PageContainer from '../../components/PageContainer';
import DetailDesc from '../../components/DetailDescription';
import { infoData, dataSource } from './data';
import XLSXUtil from '../../common/sheetUtils';
import './index.less';

const DescItem = DetailDesc.Item;

const classPreix = 'manage-detail';

function ManageDetail({ t }) {
  const columns = [
    {
      title: t('partNumber'),
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: t('partName'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('partCode'),
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: t('partStatus'),
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const [tabData, setTableData] = useState(dataSource);

  const handleExport = () => {
    const data = tabData.map(item => {
      const obj = {};
      obj.name = item.name;
      obj.id = item.id;
      return obj;
    });
    data.unshift({
      name: '参与人姓名（必填）',
      id: '自定义唯一标识（必填）'
    });
    XLSXUtil.exportFile(data, `${infoData.lottleTitle}.xlsx`);
  };

  useEffect(() => {
    setTableData(tabData.map((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item.index = index + 1;
      return item;
    }));
  }, []);

  return (
    <div className={`${classPreix}`}>
      <div className={`${classPreix}-container`}>
        <PageHeader title={t('projectDetail')} />
        <PageContainer>
          <DetailDesc
            title={t('baseInfo')}
            column={1}
          >
            <DescItem
              label={t('wheelTheme')}
            >
              <p className={`${classPreix}-value`}>{infoData.lottleTitle}</p>
            </DescItem>
            <DescItem
              label={t('wheelDesc')}
            >
              <p>
                {infoData.desc}
              </p>
            </DescItem>
            <DescItem label={t('resultIndexName')}>
              <p className={`${classPreix}-value`}>{infoData.resIndicatorName}</p>
            </DescItem>
            <DescItem label={t('numOfResult')}>
              <p className={`${classPreix}-value`}>{infoData.resultCount}</p>
            </DescItem>
            <DescItem label={t('wheelCode')}>
              <p className={`${classPreix}-value`}>{infoData.status}</p>
            </DescItem>
          </DetailDesc>
          <DetailDesc
            title={t('ruleInfo')}
            column={1}
          >
            <DescItem
              label={t('wheelDarwTime')}
            >
              <p className={`${classPreix}-value`}>
                {infoData.time}
              </p>
            </DescItem>
            <DescItem
              label={t('wheelDrawTimes')}
            >
              <p className={`${classPreix}-value`}>{infoData.lottleNumberType}</p>
            </DescItem>
            <DescItem label={t('lotteryWays')}>
              <p className={`${classPreix}-value`}>{infoData.lottleWayType}</p>
            </DescItem>
          </DetailDesc>
          <DetailDesc
            title={t('dataInfo')}
            column={1}
          >
            <DescItem label={t('wheelSeedNumber')}>
              <p className={`${classPreix}-value`}>{infoData.seedCount}</p>
            </DescItem>
          </DetailDesc>
          <div className={`${classPreix}-seedInfo`}>
            <div className={`${classPreix}-seedInfo-search-bar`}>
              <Input
                className={`${classPreix}-search-input`}
                placeholder={t('inputNameOrCode')}
              />
              <Button
                type="primary"
                className={`${classPreix}-search-btn`}
                onClick={handleExport}
              >
                {t('search')}
              </Button>
              <Upload
                className={`${classPreix}-search-upload`}
              >
                <Button
                  type="primary"
                >
                  {t('reImport')}
                </Button>
              </Upload>
            </div>
            <div className={`${classPreix}-seedInfo-table`}>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  showQuickJumper: true,
                  showTotal: total => (`共${total}条数据`)
                }}
              />
            </div>
          </div>
          <div
            className={`${classPreix}-verify`}
          >
            <h1>
              {t('wheelResultNotarization')}
            </h1>
            <div className={`${classPreix}-verify-info`}>
              <div className="item">
                <span>{t('requestId')}</span>
                <Link to="/homepage">随机数requestID</Link>
              </div>
              <div className="item">
                <span>{t('randomOnChain')}</span>
                <span>1212</span>
              </div>
              <div className="item">
                <span>{t('transactionHash')}</span>
                <Link to="/homepage">随机数requestID</Link>
              </div>
              <div className="item">
                <span>{t('blockHash')}</span>
                <Link to="/homepage">随机数requestID</Link>
              </div>
              <div className="item">
                <span>{t('blockHeight')}</span>
                <Link to="/homepage">随机数requestID</Link>
              </div>
              <div className="item">
                <span>{t('chainupTime')}</span>
                <span>随机数requestID</span>
              </div>
              <div className="item">
                <span>{t('extendedInfo')}</span>
                <span>随机数requestID</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}

ManageDetail.propTypes = {
  t: func.isRequired
};

export default withTranslation()(ManageDetail);
