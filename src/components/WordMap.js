import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Polyline} from "react-google-maps"
import WordMarker from './WordMarker.js'
import {connect} from 'react-redux'

const styles = require('../GoogleMapStyles.json')

// const WordMap = withScriptjs(withGoogleMap((props) => {

class WordMap extends Component {
  render(){
    console.log(this.props.state)

  const wordPositions = this.props.state.currentLocation.map((coord => 
    <WordMarker
      position={coord}
    />
  ))



  return (
    <GoogleMap
      defaultZoom={3}
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
     {wordPositions}
    </GoogleMap>
  )
}
}


const mapStateToProps = (state) => {
  return {
    state
  }
}

// export default connect(mapStateToProps)(WordMap)
export default connect(mapStateToProps)(withScriptjs(withGoogleMap(WordMap)))
