// import React, { Component, Fragment } from 'react';
// import {connect} from 'react-redux'
// import { compose } from 'redux'
// import Sidebar from './Sidebar.js'
// import Word from '../components/Word.js'
// import Navbar from '../components/Navbar'

// import { Map, GoogleApiWrapper, InfoWindow, Marker, Polyline, Animation } from 'google-maps-react';

// const mapStyles = {
//   position: 'relative',
//   marginTop: '1%',
//   marginLeft: '38%',
//   width: '60%',
//   height: '96%',
//   border: 'solid 2px black',
// };



// class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
 
//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   };

//   render(){
//     const wordPositions = this.props.state.currentLocation.map((coord => 
//       <Marker
//         position={coord}
//         onClick={this.onMarkerClick}
//         animation={this.props.google.maps.Animation.DROP}
//       />
//     ))
//     return(
//       <div>
//         <Navbar/>
//         <Sidebar/>
//         <Word/>
//         <div>      
//           <Map 
//             google={this.props.google}
//             onClick={this.onMapClicked}
//             zoom={3}
//             style={mapStyles}
//             initialCenter={{lat: 37.5647, lng: 49.1472}}
//             // center={this.props.currentLocation}
//           >
//           <InfoWindow
//             marker={this.state.activeMarker}
//             visible={this.state.showingInfoWindow}
//           >
//             <div>
//               <h1>"{this.props.state.word}"</h1>
//               <p>{this.props.state.etymology}</p>
//             </div>
//           </InfoWindow>
//           <Polyline
//             path={this.props.state.currentLocation}
//             strokeColor="#0000FF"
//             strokeOpacity={0.8}
//             strokeWeight={2} />
//             {wordPositions}
//           </Map>
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     state
//   }
// }

// const enhance = compose(
// connect(mapStateToProps),
// 	GoogleApiWrapper({apiKey: process.env.REACT_APP_GOOGLE_API_KEY}),
// )

// export default enhance(MapContainer)