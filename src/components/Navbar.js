import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import '../App.css'


class Navbar extends Component {

  render(){
    const navLinks = () => {
      if (localStorage.token){
        return (
        <Fragment >
          <div />
          <Link className="navBar" style={{marginRight: '50px'}} to={'/profile'}>Profile</Link>
          <Link className="navBar" to={'/logout'}>Log Out</Link>
        </Fragment>
      )
      } else {
        return (
          <Fragment>
            <Link className="navBar" to={'/login'}>Log in!</Link>
          </Fragment>
        )
      }
    }

  return (
      <div style={{marginTop: `20px`}}>
        { navLinks() }
      </div>
  )
  }

}

export default withRouter(Navbar)