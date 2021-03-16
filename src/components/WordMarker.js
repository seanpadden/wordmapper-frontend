import React, { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux'
import greyghostboi from './greyghostboi.svg'
import featherpad from './featherpad.svg'


class WordMarker extends Component {

  state = {
    active: false,
  }

  handleOpen = () => {
    this.setState({
      active: !this.state.active
    })
  }

  handleClose = () => {
    this.setState({
      active: false
    })
  }

  render(){
    ///Get rid of weird characters in etymology string
    let etyArray = this.props.state.word.etymology[0]
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
          icon={featherpad}
          >
        {
          this.state.active ?
          <InfoWindow>
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