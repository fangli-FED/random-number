/**
 * @file title
 */
import React from 'react';
import {
  Row,
  Col
} from 'antd';
import { useTranslation } from 'react-i18next';
import './index.less';

const ListTitle = () => {
  const [t] = useTranslation();
  return (
    <Row>
      <Col span={8} className="list-title">{t('order')}</Col>
      <Col span={8} className="list-title">{t('name')}</Col>
      <Col span={8} className="list-title">{t('code')}</Col>
    </Row>
  );
};

export default ListTitle;
