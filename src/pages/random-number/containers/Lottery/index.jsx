import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, ActivityIndicator
} from 'antd-mobile';
import Navigation from '../../components/Navigation';
import './index.less';

const generatingData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      index: i + 1,
      name: `小王${i}`,
      number: i
    });
  }
  return data;
};

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

class Lottery extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      animating: false
    };
  }

  lotteryClick = () => {
    this.setState({
      animating: true
    });
    setTimeout(() => {
      this.setState({
        animating: false
      });
      const { history } = this.props;
      history.push('/selected');
    }, 500);
  }

  render() {
    const { animating } = this.state;
    return (
      <div className="lottery">
        <Navigation title="标题" className="lottery-title" />
        <div className="lottery-content">
          <div className="lottery-line">
            {paramName.map(nameMapping)}
          </div>
          {
            generatingData().map(dataMapping)
          }
        </div>
        <Button className="lottery-btn" onClick={this.lotteryClick}>点击摇号</Button>

        <ActivityIndicator
          toast
          text="Loading..."
          animating={animating}
        />
      </div>
    );
  }
}

export default withRouter(Lottery);
