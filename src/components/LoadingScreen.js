import React, { Component } from 'react';
import '../LoadingScreen.css'

class LoadingScreen extends Component  {

  state = {
    done: undefined
  }
  componentDidMount(){
    setTimeout(() => this.props.history.push('/map'), 2500);
  }


  render(){
    return(
      <div className="LoadingScreen-component">
        <h1 style={{textAlign: 'center', color: 'white'}}>Please wait while we generate your map...</h1>
      </div>
    )
  }
}

export default LoadingScreen