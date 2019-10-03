import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import '../LoginPage.css'


class Navbar extends Component {

  render(){
    const navLinks = () => {
      if (localStorage.token){
        return (
        <Fragment >
          <div />
          <Link style={{marginRight: '50px'}} to={'/logout'}>Log Out</Link>
          <Link to={'/profile'}>Profile</Link>
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