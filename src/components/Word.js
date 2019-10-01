import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Word.css'
import '../index.css'
import '../App.css'


class Word extends Component {
  render(){
    let dumbDate = this.props.state.date
    const regex = /{(.*?)}/g
    if (regex.test(dumbDate)){
      var dateToShow = dumbDate.replace(regex, "")
    } else {
      var dateToShow = dumbDate
    }
    console.log(this.props.state.date)
    return(
      <div className="word">
      <h1>Your word is...</h1>
      <h1>{this.props.state.word}</h1>
          <h2>Definition:</h2>
            <p>{this.props.state.shortdef[0]}</p>
          <h2>First known use</h2>
            <p>{dateToShow}</p>
          </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    state 
  }
}

export default connect(mapStateToProps, null)(Word)