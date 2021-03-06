import React, {Component} from 'react';
import {connect} from 'react-redux';
import { userPostFetch } from '../Redux/userActions.js'
import '../styles/css/LoginPage.css'


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
  }

  handleSwitch = () => {
    this.setState({
      loginClicked: !this.state.loginClicked,
      signupClicked: !this.state.signupClicked

    })
  }

  render() {
    return (
      <div className="main">
        <button className="btn-switch">Sign Up</button>
      <div className="divider"/>
      <button className="btn-switch" onClick={this.props.handleSwitch}>Log In</button>
        <p className="sign">Register here please</p>
          <form className="form1" onSubmit={this.handleSubmit}>
            <input className="un"  onChange={this.handleChange} value={this.state.username} placeholder="Username" type="text" name="username"/>
            <input className="pass" onChange={this.handleChange} value={this.state.password} placeholder="password" type="password" name="password"/>
            <input className="submit" type="submit" value="Sign up!"/>
          </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userPostFetch: (userObj, history) => dispatch(userPostFetch(userObj, history))
})

export default connect(null, mapDispatchToProps)(SignUpPage)