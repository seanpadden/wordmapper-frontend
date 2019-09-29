import React, { Component } from "react"
import { compose, withProps } from "recompose"
import {connect} from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline, Animation } from "react-google-maps"
import WordMap from "../components/WordMap";
import Sidebar from './Sidebar.js'

const styles = require('../GoogleMapStyles.json')

///**********************TRYING THEIR WAY **********************\\\


// const WordMapContainer = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
//     loadingElement: <div style={{ height: `100%`, }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ 
//       height: '200%', 
//       width: '60%',
//       position: 'relative',
//       marginTop: '1%',
//       marginLeft: '38%',
//       border: 'solid 2px black',
//     }} />,
//   }),
  
//   withScriptjs,
//   withGoogleMap)((props) =>
//   <GoogleMap
//       defaultZoom={3}
//       defaultCenter={{lat: 37.5647, lng: 49.1472}}
//       defaultOptions={{
//         disableDefaultUI: true, // disable default map UI
//         draggable: true, // make map draggable
//         keyboardShortcuts: false, // disable keyboard shortcuts
//         scaleControl: true, // allow scale controle
//         scrollwheel: true, // allow scroll wheel
//         styles: styles // change default map styles
//       }}
//     >
//       <Marker 
//         position={{lat: 37.5647, lng: 49.1472}}
//         onClick={(message, lang, lat) =>
//           props.handleMarkerClick(
//             'Custom Google Map marker with infobox!',
//             40.7484445,
//             -73.9878584
//           )
//         } // Get the data that will be used for InfoWindow.
//       />

//       {props.isInfoboxVisible && (
//         <InfoWindow
//           position={{
//             lat: props.infoboxPosY,
//             lng: props.infoboxPosX
//           }}
//           onCloseClick={() => props.handleInfoboxClick()}
//         >
//           <div>
//             <h4>{props.infoboxMessage}</h4>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   )

///**********************TRYING WITH CLASS **********************\\\

// class WordMapContainer extends Component {
//   state = {
//     infoboxMessage: '',
//     isInfoboxVisible: false,
//     markerLang: 0,
//     markerLat: 0
//   }
  
//   handleMarkerClick = (message, lang, lat) => {
//     console.log('yo')

//     this.setState({
//       // infoboxMessage: message, // Message shown in info window
//       isInfoboxVisible: !this.state.isInfoboxVisible, // Show info window
//       // markerLang: lang + 0.006, // Y coordinate for positioning info window
//       // markerLat: lat - 0.0004 // X coordinate for positioning info window
//     })
//   }

//   handleInfoboxClick = () => {
//     this.setState({
//       isInfoboxVisible: false
//     })
//   }

//   render() {
//     const MapComponent = compose(
//       withProps({
//         googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
//         loadingElement: <div style={{ height: `100%`, }} />,
//         containerElement: <div style={{ height: `400px` }} />,
//         mapElement: <div style={{ 
//           height: '200%', 
//           width: '60%',
//           position: 'relative',
//           marginTop: '1%',
//           marginLeft: '38%',
//           border: 'solid 2px black',
//         }} />,
//       }),
      
//       withScriptjs,
//       withGoogleMap)((props) =>
//       <GoogleMap
//           defaultZoom={3}
//           defaultCenter={{lat: 37.5647, lng: 49.1472}}
//           defaultOptions={{
//             disableDefaultUI: true, // disable default map UI
//             draggable: true, // make map draggable
//             keyboardShortcuts: false, // disable keyboard shortcuts
//             scaleControl: true, // allow scale controle
//             scrollwheel: true, // allow scroll wheel
//             styles: styles // change default map styles
//           }}
//         >
//           <Marker 
//             position={{lat: 37.5647, lng: 49.1472}}
//             onClick={this.handleMarkerClick} // Get the data that will be used for InfoWindow.
//           />
//           {this.state.isInfoboxVisible ? 
//             <InfoWindow
//               position={{lat: 37.5647, lng: 49.1472}}
//               onCloseClick={this.handleInfoboxClick}
//             >
//               <div>
//                 <h4>{this.state.infoboxMessage}</h4>
//               </div>
//             </InfoWindow>
//             : null}
//           )}
//         </GoogleMap>
//       )
//       const wordPositions = this.props.state.currentLocation.map((coord => 
//         <Marker
//           position={coord}
//         />
//       ))
  

//     console.log("MI PROPS:", this.props)
//     console.log("MI LOCAL STATE:", this.state)
//     return (
//       <div>
//         <Sidebar/>
//         <MapComponent
//         />
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     state
//   }
// }
  
//   export default connect(mapStateToProps, null)(WordMapContainer)

///**********************TRYING REACT WAY **********************\\\


class WordMapContainer extends Component {
  
  render() {
    
  const wordPositions = this.props.state.currentLocation.map((coord => 
    <Marker
      position={coord}
    />
  ))

    console.log("MI PROPS:", this.props.state)
    console.log("MI LOCAL STATE:", this.state)
    return (
      <div>
        <Sidebar/>
        <div>
        <WordMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement=
            {<div style={{ 
            height: '200%', 
            width: '60%',
            position: 'relative',
            marginTop: '1%',
            marginLeft: '38%',
            border: 'solid 2px black',
            }}
            />}
        />
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
  
  export default connect(mapStateToProps, null)(WordMapContainer)