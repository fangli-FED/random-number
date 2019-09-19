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
    scroll: false
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.number,
    })).isRequired,
    scroll: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      listPaddingTop: 0,
      newList: listIndexSet(props.list)
    };
    this.scrollList = React.createRef();
  }

  componentDidMount() {
    const { scroll } = this.props;
    console.log('scrollList', this.scrollList);
    if (scroll) {
      // this.scrollList.current.style.height = this.scrollList.current.offsetHeight;
      this.scrollDown();
      // setInterval(this.scrollDown, 1000);
    }
  }

  scrollDown = () => {
    // const { current: e } = this.scrollList;
    const { newList } = this.state;
    // this.setState({ listPaddingTop: '50px' });
    setInterval(() => {
      // e.firstChild.classList.remove('scroll-margin-top');
      newList.unshift(newList[newList.length - 1]);
      newList.pop();
      this.setState({
        // listPaddingTop: '0',
        newList
      });
    }, 100);
  }

  render() {
    const { scroll } = this.props;
    const { listPaddingTop, newList } = this.state;
    const style = {};
    if (scroll) {
      style.paddingTop = listPaddingTop;
      // if (this.scrollList) { style.height = this.scrollList.currentoffsetHeight; }
    }
    return (
      <div
        style={{ paddingTop: listPaddingTop }}
        className={`${classPrefix} ${scroll ? 'overflow-hidden' : ''} animate`}
        ref={this.scrollList}
      >
        {newList.map(dataMapping)}
      </div>
    );
  }
}

export default ScrollList;
