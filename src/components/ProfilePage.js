import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar.js'
import UserMap from './UserMap.js'


class ProfilePage extends Component {

  state = {
    userMaps: [],
    currentLocation: {
      lat: 0,
      lng: 0
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/maps/")
      .then(resp => resp.json())
      .then(data => this.findUserMaps(data))
  }

  findUserMaps = (data) => {    
    let userMaps = data.filter(mapObj => mapObj.user.id === this.props.state.currentUser.id)
    this.setState({
      userMaps: userMaps
    })
    // this.convertToCoords()
  }

  // convertToCoords = () => {
  //   const renderMarkers = this.state.userMaps.map((mapObj => {
  //     if (mapObj.coordinates.length > 0) {
  //     mapObj.coordinates.map(coord => 
  //       <UserMap 
  //       lat={parseFloat(coord.lat)}
  //       lng={parseFloat(coord.lng)}
  //       />
  //       )
  //     }
  //   } 
  //   ))
  // }

  render() {
    return (
      <div>
      <Navbar />
        {
          this.props.state.currentUser.username ?
          <h1>{this.props.state.currentUser.username}'s profile</h1> 
          :
          <h1>How did you get you get here?!? Login!</h1>
        }
        <div>
        <UserMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ display: `flex`, position: `fixed`, height: `100%`, width: `100%` }} />}
          mapElement={<div style={{ 
            height: '50%',  
            width: '40%',
            position: 'relative',
            marginTop: '1%',
            marginLeft: '38%',
            border: 'solid 2px black',
            }}
            />}
            userMaps={this.state.userMaps}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state 
  }
}

export default connect(mapStateToProps, null)(ProfilePage)