import React, { Component } from 'react';
import {connect} from 'react-redux';
import UserMap from './UserMap.js'
import ProfileSidebar from './ProfileSidebar.js'


class ProfilePage extends Component {

  state = {
    userMaps: [],
  }

  componentDidMount(){
    if (!localStorage.token || !this.props.state.currentUser.username) {
      this.props.history.push('/login')
    } 
    fetch("https://wordmapper-backend.herokuapp.com/maps")
      .then(resp => resp.json())
      .then(data => this.findUserMaps(data))
  }

  findUserMaps = (data) => {    
    let userMaps = data.filter(mapObj => mapObj.user.id === this.props.state.currentUser.id)
    this.setState({
      userMaps: userMaps
    })
  }

  

  render() {
    const userWords = this.state.userMaps.map((mapObj => 
      <p>{mapObj.word_name}</p>
    ))
    return (
      <div>
      <ProfileSidebar/>
        <div className="word-profile">
          <h1>Your saved words</h1>
          {userWords}
        </div>
        <div>
        <UserMap  
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ display: `flex`, position: `fixed`, height: `100%`, width: `100%` }} />}
          mapElement={<div style={{ 
            height: '95%',  
            width: '60%',
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