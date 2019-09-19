import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Comment extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  backClick = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    return (
      <div>
        Comment
        <button type="button" onClick={this.backClick}>back</button>
      </div>
    );
  }
}

export default withRouter(Comment);
