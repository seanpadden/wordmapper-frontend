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