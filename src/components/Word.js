import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Word.css'
import '../index.css'
import '../App.css'

class Word extends Component {

  state = {
    word: 'is-paused',
    definition: 'is-paused',
    date: 'is-paused'
  }

  componentDidMount(){
    setTimeout(() => { 
      this.setState(() => ({
        word: ''
      }))
    }, 700)
    setTimeout(() => { 
      this.setState(() => ({
        date: ''
      }))
    }, 1300)
    setTimeout(() => { 
      this.setState(() => ({
        definition: ''
      }))
    }, 1900)
  }
  
  render(){
    let dumbDate = this.props.state.date
    const regex = /{(.*?)}/g
    if (regex.test(dumbDate)){
      var dateToShow = dumbDate.replace(regex, "")
    } else {
      var dateToShow = dumbDate
    }
    return(
      <div className="word">
        <h1 className={`fade-in ${this.state.word}`}>{this.props.state.word}</h1>
        <h3 className={`fade-in ${this.state.date}`}>First known use: {dateToShow}</h3>
        <p className={`fade-in ${this.state.definition}`}>{this.props.state.shortdef[0]}</p>    
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