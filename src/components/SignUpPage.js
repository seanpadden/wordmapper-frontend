import React, {Component} from 'react';
import {connect} from 'react-redux';
import { userPostFetch } from '../Redux/userActions.js'


class SignUpPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.userPostFetch(this.state, this.props.history)
    // fetch('http://localhost:3000/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.token) {
    //     localStorage.token = data.token
    //     this.props.history.push('/profile')
    //   }
    // })
  }

  render() {
    return (
      <div>
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="text" name="password"/>
          <input type="submit" value="Sign Up!"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userObj, history) => dispatch(userPostFetch(userObj, history))
})

export default connect(null, mapDispatchToProps)(SignUpPage)