import React, { Component } from 'react';
import {connect} from 'react-redux';


class ProfilePage extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/profile',{
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(user => 
      this.setState({
        username: user.username
      })
    )
  }

  handleClick = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        {
          this.state.username ?
          <h1>{this.state.username}'s profile</h1> :
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