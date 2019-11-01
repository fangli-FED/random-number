import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
    };
  }

  confirm = () => {
    const { history } = this.props;
    history.push('/lottery/begin');
  }

  render() {
    const { list, t } = this.props;
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
