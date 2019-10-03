import React, { Component } from 'react';
import {connect} from 'react-redux'
import {removeWord} from '../Redux/actions.js'
import {saveMapFetch} from '../Redux/actions.js'

import '../App.css'
import { NavLink } from 'react-router-dom'

class ProfileSidebar extends Component {

  handleClick = () => {
    this.props.saveMapFetch(this.props.state)
  }

  render(){
    return(
    <div className="sidenav" >
    <p className="greeting">Hi, {this.props.state.currentUser.username}</p>
        <NavLink to="/input" >Search Again</NavLink>
        <NavLink to={'/logout'}>Log Out</NavLink>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}



export default connect(mapStateToProps, {removeWord, saveMapFetch})(ProfileSidebar)