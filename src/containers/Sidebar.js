import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../App.css'
import { NavLink } from 'react-router-dom'



class Sidebar extends Component {
  render(){
    return(
      <div className="sidenav">
        <button>hi</button>
        <NavLink to="/input">Go Back</NavLink>
        <NavLink to="/profile">Profile</NavLink>


      </div>
    )
  }
}

export default Sidebar