import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button
} from 'antd-mobile';
import './index.less';

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

class HomePage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      randomNumber: '点击获取随机数'
    };
  }

  getCLick = () => {
    this.setState({
      randomNumber: randomNum(0, 10)
    });
  }

  lotteryClick = () => {
    const { history } = this.props;
    history.push('/lottery');
  }

  commentClick = () => {
    const { history } = this.props;
    history.push('/comment');
  }

  render() {
    const { randomNumber } = this.state;
    return (
      <div className="home">
        <Button className="home-btn" onClick={this.getCLick}>点击获取</Button>
        <div className="home-lotterShow">{randomNumber}</div>
        <Button className="home-btn" onClick={this.lotteryClick}>简单摇号示例</Button>
        <Button className="home-btn" onClick={this.commentClick}>讲解</Button>
      </div>
    );
  }
}

export default withRouter(HomePage);
