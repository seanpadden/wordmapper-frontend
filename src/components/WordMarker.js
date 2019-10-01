import React, { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux'


class WordMarker extends Component {

  state = {
    active: false,
  }

  handleOpen = () => {
    this.setState({
      active: true
    })
  }

  handleClose = () => {
    this.setState({
      active: false
    })
  }


  render(){
    let etyArray = this.props.state.etymology[0]
    let etyString = etyArray[1]
    const regex = /{(.*?)}/g
    if (regex.test(etyString)){
      var stringToShow = etyString.replace(regex, "")
    }
    
    return(
      <div>
        <Marker 
          position={this.props.position}
          onClick={this.handleOpen}
          animation={window.google.maps.Animation.DROP}
          >
        {
          this.state.active ?
          <InfoWindow 
            onCloseClick={this.handleClose}
            defaultPosition={this.props.position}>
            <div>{stringToShow}</div>
          </InfoWindow>
          :
          null
        }
        </Marker>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(WordMarker)