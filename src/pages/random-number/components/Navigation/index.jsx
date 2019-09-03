import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Navigation extends React.Component {
  static defaultProps = {
    className: null
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.goBack = this.goBack.bind(this);
  }


  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      title, className
    } = this.props;
    return (
      <NavBar
        className={className}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={this.goBack}
      >
        {title}
      </NavBar>
    );
  }
}

export default withRouter(Navigation);
