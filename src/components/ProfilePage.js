import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar.js'


class ProfilePage extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
      <Navbar />
        {
          this.props.state.currentUser.username ?
          <h1>{this.props.state.currentUser.username}'s profile</h1> 
          :
          <h1>How did you get you get here?!? Login!</h1>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state 
  }
}

export default connect(mapStateToProps, null)(ProfilePage)