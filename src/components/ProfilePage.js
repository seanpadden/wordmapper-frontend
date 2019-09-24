import React, { Component } from 'react';

class ProfilePage extends Component {
  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/signup')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        {
          this.props.currentUser ?
          <h1>Welcome {this.props.currentUser}!</h1> :
          <h1>getting your info...</h1>
        }
      </div>
    );
  }
}

export default ProfilePage;