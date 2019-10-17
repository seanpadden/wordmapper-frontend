import React, { Component } from 'react';
import {connect} from 'react-redux'
import {removeWord} from '../Redux/actions.js'
import {saveMapFetch} from '../Redux/actions.js'

import '../App.css'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick = () => {
    this.props.saveMapFetch(this.props.state)
  }

  render(){
    return(
      <div className="sidenav" >
        <button className="save" onClick={this.handleClick}>Save this word</button>
        <NavLink to="/input" >Search Again</NavLink>
        <NavLink to="/profile" >Profile</NavLink>
        <NavLink to="/logout" >Logout</NavLink>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}



export default connect(mapStateToProps, {removeWord, saveMapFetch})(Sidebar)