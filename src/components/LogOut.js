import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logoutUser } from '../Redux/userActions.js'
import { withRouter } from "react-router-dom"

class Logout extends Component {

  handleLogout = () => {
    console.log(localStorage)
    localStorage.removeItem("token")
    this.props.logoutUser()
    this.props.history.push("/login");
  }

  render() {
    return(
      <div>
      { this.handleLogout() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))