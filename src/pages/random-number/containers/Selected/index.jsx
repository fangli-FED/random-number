import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Button
} from 'antd-mobile';
import Navigation from '../../components/Navigation';
import { listIndexSet } from '../../common/publicFunc';

const param = ['index', 'name', 'number'];

const dataMapping = data => (
  <div className="lottery-line" key={`${data.index}-lottery-line`}>
    {param.map((res, index) => (
      <div className={`lottery-line-${res}`} key={`lottery-line-${res + index}`}>{data[res]}</div>
    ))}
  </div>
);

const paramName = ['序号', '名字', '号码'];

const nameMapping = (data, index) => (
  <div className={`lottery-line-${param[index]}`} key={data}>{data}</div>
);

class Selected extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }).isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  backClick = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { list } = this.props;
    return (
      <div className="lottery">
        <Navigation className="lottery-title" title="摇号结果" />
        <div className="lottery-content">
          <div className="lottery-line">
            {paramName.map(nameMapping)}
          </div>
          {
            listIndexSet(list).map(dataMapping)
          }
        </div>
        <Button className="lottery-btn" onClick={this.backClick}>确定</Button>
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
);

export default wrapper(Selected);
