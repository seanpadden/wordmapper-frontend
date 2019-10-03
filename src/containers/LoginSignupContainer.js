import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../LoginPage.css'
import SignUpPage from '../components/SignUpPage.js'
import LoginPage from '../components/LoginPage.js'

class LoginSignupContainer extends Component {

  state = {
    signupClicked: true,
    loginClicked: false
  }

  handleSwitch = () => {
    this.setState({
      signupClicked: !this.state.signupClicked,
      loginClicked: !this.state.loginClicked
    })
  }

  render() {
    return (
      <div>
        <h1 className="header">WordMapper</h1>

        {this.state.signupClicked ?
        <SignUpPage 
          loginClicked={this.state.loginClicked}
          signupClicked={this.state.signupClicked}
          handleSwitch={this.handleSwitch}
          history={this.props.history}
        />
        :
        <LoginPage
          loginClicked={this.state.loginClicked}
          signupClicked={this.state.signupClicked}
          handleSwitch={this.handleSwitch}
          history={this.props.history}
        />
        }
      </div>
    )
  }
}

export default LoginSignupContainer