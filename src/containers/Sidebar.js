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
        <NavLink to="/input" >Go Back</NavLink>
        <NavLink to="/profile" >Profile</NavLink>
        <button className="submit" onClick={this.handleClick}>OMG I love this!!</button>
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