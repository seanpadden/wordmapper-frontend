import React, { Component } from 'react';
import {connect} from 'react-redux';
import { userLoginFetch } from '../Redux/userActions.js'


class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.userLoginFetch(this.state, this.props.history)
  }

  render() {
    return (
      <div>
        <h1>Log in please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="text" name="password"/>
          <input type="submit" value="Please login!"/>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoginFetch: (userObj, history) => dispatch(userLoginFetch(userObj, history))
})

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)