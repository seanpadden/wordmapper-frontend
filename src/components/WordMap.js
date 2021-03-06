import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Polyline} from "react-google-maps"
import WordMarker from './WordMarker.js'
import {connect} from 'react-redux'

const styles = require('../styles/map-styles/GoogleMapStyles.json')

class WordMap extends Component {
  render(){
    const wordPositions = this.props.state.currentLocation.map((coord => 
      <WordMarker
        lat={parseFloat(coord.lat)}
        lng={parseFloat(coord.lng)}
      />
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
      <Polyline 
        path={this.props.state.currentLocation}
        options={{
          strokeColor: "#9E24B1",
          strokeOpacity: 0.75,
          strokeWeight: 2,
        }}
      />
        {wordPositions}
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

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(WordMap)))
