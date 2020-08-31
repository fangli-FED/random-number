import React from 'react';
// import {
//   If,
//   Then,
//   Else,
// } from 'react-if';
// import { throwttle } from '../../common/utils';
import WebHeader from './components/WebHeader';
// import MobileHeader from './components/MobileHeader';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isPhone: false,
    };

    // this.thorowttleWindwoChange = throwttle(this.windwoChange, 400);
  }


  // componentDidMount() {
  //   window.addEventListener('resize', this.thorowttleWindwoChange);

  //   this.windwoChange();
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.thorowttleWindwoChange);
  // }

  // windwoChange = () => {
  //   this.setState({
  //     isPhone: document.body.clientWidth <= 768
  //   });
  // }

  render() {
    // const { isPhone } = this.state;
    return (
      <WebHeader />
      // <If condition={isPhone}>
      //   <Then>
      //     {/* <MobileHeader /> */}
      //   </Then>
      //   <Else>
      //   </Else>
      // </If>
    );
  }
}

export default Navigation;
