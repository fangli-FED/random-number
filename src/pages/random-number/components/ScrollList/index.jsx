import React from 'react';
import PropTypes from 'prop-types';
import { listIndexSet } from '../../common/publicFunc';
import './index.less';

const classPrefix = 'scroll';
const param = ['index', 'name', 'number'];
const dataMapping = data => (
  <div className={`${classPrefix}-line`} key={`${data.index}-scroll-line`}>
    {param.map((res, index) => (
      <div className={`${classPrefix}-line-${res}`} key={`scroll-line-${res + index}`}>{data[res]}</div>
    ))}
  </div>
);


class ScrollList extends React.Component {
  static defaultProps = {
    // 数据滚动
    scroll: false,
    // 传入的数据需要添加编号。false时传入编完号的数据，或不需要编号的数据
    setIndex: true,
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.string,
      name: PropTypes.string,
      // number: PropTypes.number,
    })).isRequired,
    scroll: PropTypes.bool,
    setIndex: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      newList: props.setIndex ? listIndexSet(props.list) : props.list,
    };
    this.scrollList = React.createRef();
  }

  componentDidMount() {
    const { scroll } = this.props;
    if (scroll) {
      this.scrollDown();
    }
  }

  componentWillReceiveProps(newProps) {
    const { scroll, list } = newProps;
    if (scroll) {
      this.scrollDown();
    } else if (this.interval) {
      clearInterval(this.interval);
      this.setState({
        newList: listIndexSet(list)
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scrollDown = () => {
    const { newList } = this.state;
    this.interval = setInterval(() => {
      newList.unshift(newList[newList.length - 1]);
      newList.pop();
      this.setState({
        newList
      });
    }, 100);
  }

  render() {
    const { newList } = this.state;
    return (
      <>
        {newList.map(dataMapping)}
      </>
    );
  }
}

export default ScrollList;
