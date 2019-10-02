import React, { Component } from "react"
import { Marker, Polyline } from "react-google-maps";
import {connect} from 'react-redux'


class UserMarker extends Component {


  render(){
    return(
      <div>
        <Marker 
          position={{lat: this.props.lat, lng: this.props.lng}}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(UserMarker)