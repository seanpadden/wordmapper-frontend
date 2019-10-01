import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker} from "react-google-maps"
import {connect} from 'react-redux'

const styles = require('../GoogleMapStyles.json')

class UserMap extends Component {
  render(){

  const renderMaps = this.props.userMaps.map(map => 
    <Marker 
      position={{lat: map.lat, lng: map.lng}}
      /> 
    )

  return (
    <div className="map-component">
    <h1>Your saved maps</h1>
    <h3>{this.props.userMaps.word}</h3>
    <GoogleMap
      defaultZoom={2.5}
      defaultCenter={{lat: 37.5647, lng: 49.1472}}
      defaultOptions={{
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: true, // allow scale controle
        scrollwheel: true, // allow scroll wheel
        styles: styles // change default map styles
      }}
    >
    {renderMaps}
      />

    </GoogleMap>

    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(UserMap)))
