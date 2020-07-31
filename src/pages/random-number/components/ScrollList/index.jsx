/**
 * @file animated scroll list
 * @author atom-yang
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useInterval } from 'react-use';
import {
  Row,
  Col
} from 'antd';
import {
  If,
  Then
} from 'react-if';
import {
  randomSort,
  throwttle
} from '../../common/utils';
import ListTitle from '../ListTitle';
import './index.less';

export const ContentList = props => {
  const { list = [] } = props;
  const [, i18n] = useTranslation();
  return (
    <div className="content-list">
      {list.map(v => (
        <Row key={v.number} className="content-list-item">
          <Col span={8} className="content-list-item-order">{v.order[i18n.language || 'zh-CN']}</Col>
          <Col span={8} className="content-list-item-name">{v.name}</Col>
          <Col span={8} className="content-list-item-number">{v.number}</Col>
        </Row>
      ))}
    </div>
  );
};

ContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.object,
    name: PropTypes.string,
    number: PropTypes.number,
  })).isRequired
};

const ScrollList = props => {
  const {
    list,
    delay,
    animated,
    panelNumber
  } = props;
  const [
    currentList,
    setCurrentList
  ] = useState([...list]);
  const [
    isPhone,
    setIsPhone
  ] = useState(false);
  const setIsPhoneValue = () => {
    setIsPhone(document.body.clientWidth <= 768);
  };

  const throwttleIsPhone = throwttle(setIsPhoneValue, 400);

  useEffect(() => {
    window.addEventListener('resize', throwttleIsPhone);

    setIsPhoneValue();

    return () => {
      window.removeEventListener('resize', throwttleIsPhone);
    };
  }, []);

  useInterval(() => {
    setCurrentList(currentList.slice().sort(randomSort));
  }, animated ? delay : null);

  return (
    <div className="random-list">
      <div className="random-list-title">
        <ListTitle />
        <If condition={!isPhone}>
          <Then>
            <ListTitle />
          </Then>
        </If>
      </div>
      <div className="random-list-content">
        <ContentList
          list={currentList.slice(0, panelNumber)}
        />
        <ContentList
          list={currentList.slice(panelNumber)}
        />
      </div>
    </div>
  );
};

ScrollList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.object,
    name: PropTypes.string,
    number: PropTypes.number,
  })).isRequired,
  animated: PropTypes.bool.isRequired,
  delay: PropTypes.number, // ms
  panelNumber: PropTypes.number
};

ScrollList.defaultProps = {
  delay: 100,
  panelNumber: 50
};

export default ScrollList;
