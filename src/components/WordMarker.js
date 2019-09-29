import React, { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux'


class WordMarker extends Component {

  state = {
    active: false,
  }

  handleClick = () => {
    this.setState({
      active: !this.state.active}
    )
  }
  render(){
    console.log(this.props)
    return(
      <div>
        
        <Marker 
          position={this.props.position}
          onClick={this.handleClick}
          animation={window.google.maps.Animation.DROP}
          >
        {
          this.state.active ?
          <InfoWindow 
            defaultPosition={this.props.position}>
            <div>{this.props.state.etymology}</div>
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