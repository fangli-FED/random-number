import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';
import {
  Button,
  Divider
} from 'antd';
import ListTitle from '../../components/ListTitle';
import { ContentList } from '../../components/ScrollList';

const classPrefix = 'begin';


class Selected extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })).isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    const { list: resultList } = this.props;

    const list = resultList.map((item, index) => {
      const newItem = cloneDeep(item);
      newItem.order = {
        en: `NO.${index + 1}`,
        'zh-CN': `第${index + 1}位`
      };

      return newItem;
    });

    this.setState({
      list,
    });
  }

  confirm = () => {
    const { history } = this.props;
    history.push('/room/begin');
  }

  render() {
    const { t } = this.props;
    const { list } = this.state;
    return (
      <div className={classPrefix}>
        <div className={`${classPrefix}-content`}>
          <div className={`${classPrefix}-title`}>
            {`${t('Building')}-${t('selectedResult')}`}
          </div>
          <Divider />
          <div className={`${classPrefix}-list`}>
            <ListTitle />
            <ContentList list={list} />
          </div>
          <Button
            type="primary"
            onClick={this.confirm}
            className={`${classPrefix}-btn`}
          >
            {t('confirm')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.randomList
});


const wrapper = compose(
  connect(
    mapStateToProps,
  ),
  withRouter,
  withTranslation(),
);

export default wrapper(Selected);
