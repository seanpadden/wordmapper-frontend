import React, { Component } from 'react';
import {connect} from 'react-redux'
import { compose } from 'redux'

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  marginTop: '1%',
  marginLeft: '38%',

  width: '60%',
  height: '96%',
  border: 'solid 2px black',
};

const coordinates = [
  {lat: 0, lng: 3},
  {lat: 3, lng: 5},
  {lat: 69, lng: 420}
]

class MapContainer extends Component {
  render(){

    const wordPositions = this.props.state.currentLocation.map((coord => 
      <Marker
        position={coord}
      />
    ))
    
    return(
      <div>
        <div>
          <Map 
            google={this.props.google}
            zoom={3}
            style={mapStyles}
            initialCenter={{lat: 37.5647, lng: 49.1472}}
            // center={this.props.currentLocation}
            yesIWantToUseGoogleMapApiInternals={true}
          >

          {wordPositions}
          </Map>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const enhance = compose(
connect(mapStateToProps),
	GoogleApiWrapper({apiKey: process.env.REACT_APP_GOOGLE_API_KEY}),
)

export default enhance(MapContainer)