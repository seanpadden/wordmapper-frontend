import React, { Component } from 'react';
import {connect} from 'react-redux';


class ProfilePage extends Component {
  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/signup')
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        {
          this.props.state.currentUser ?
          <h1>Welcome {this.props.state.currentUser}!</h1> :
          <h1>getting your info...</h1>
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