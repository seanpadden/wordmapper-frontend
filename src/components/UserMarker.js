import React, { Component } from "react"
import { Marker, Polyline } from "react-google-maps";
import {connect} from 'react-redux'


class UserMarker extends Component {


  render(){
    // let etyArray = this.props.state.etymology[0]
    // let etyString = etyArray[1]
    // const regex = /{(.*?)}/g
    // if (regex.test(etyString)){
    //   var stringToShow = etyString.replace(regex, "")
    // }
    console.log("this user's lat:", this.props.lat)
    console.log("this user's lng:", this.props.lng)

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