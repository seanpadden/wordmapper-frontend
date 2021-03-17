import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import {connect} from 'react-redux'
import UserMarker from './UserMarker.js'

const styles = require('../styles/map-styles/ProfileMapStyles.json')

class UserMap extends Component {


  render(){
    const renderMarkers = this.props.userMaps.map((mapObj => {
      if (mapObj.coordinates.length > 0) {
      return mapObj.coordinates.map(coord => 
        <UserMarker 
          lat={parseFloat(coord.lat)}
          lng={parseFloat(coord.lng)}
        />
        )
      }
    } 
    ))
  return (
    <div className="map-component">
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
    {renderMarkers}
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
