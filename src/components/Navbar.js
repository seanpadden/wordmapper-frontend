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
          <Link to={'/input'}>Search Again</Link>
          <div style={{width: `40px`}}/>
          <Link to={'/logout'}>Log Out</Link>
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