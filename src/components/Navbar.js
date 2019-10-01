import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'


class Navbar extends Component {

  render(){
    const navLinks = () => {
      if (localStorage.getItem("token")){
        return (
        <Fragment>
          <Link to={'/profile'}>Your Profile</Link>
          <Link to={'/logout'}>Log Out</Link>
        </Fragment>
      )
      } else {
        return (
          <Fragment>
            <Link to={'/login'}>Log in!</Link>
          </Fragment>
        )
      }
    }

  return (
      <div>
        { navLinks() }
      </div>
  )
  }

}

export default withRouter(Navbar)