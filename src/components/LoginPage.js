import React, { Component } from 'react';
import {connect} from 'react-redux';
import { userLoginFetch } from '../Redux/userActions.js'
import '../LoginPage.css'
import SignUpPage from './SignUpPage.js'


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
      <div className="main">
      <button className="btn-switch" onClick={this.props.handleSwitch}>Sign Up</button>
      <div class="divider"/>
      <button className="btn-switch" >Log In</button>
        <p className="sign">Sign in please</p>
          <form className="form1" onSubmit={this.handleSubmit}>
            <input className="un" placeholder="Username" onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
            <input className="pass" placeholder="Password" onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
            <input className="submit" type="submit" value="Log in!"/>
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