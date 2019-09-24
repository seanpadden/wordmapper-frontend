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
    // fetch('http://localhost:3000/login', {
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
    //     this.props.history.push('/input')
    //   }
    // })
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