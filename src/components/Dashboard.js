import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  addWord, 
  removeWord, 
  addCoordinates, 
  addLanguages, 
  wordPostFetch, 
  addMostCommonWord
} from '../Redux/actions.js'
import Navbar from './Navbar'
import '../styles/css/WordForm.css'
import {testFunc} from '../lib/testFunc.js'

class Dashboard extends Component {

  state = {
    word: '',
    username: '',
    hasCoordinates: false
  }

  componentDidMount(){
    // if (!localStorage.token || !this.props.state.currentUser.username) {
    //   this.props.history.push('/login')
    // } 
    /// Refresh Redux word state 
    this.props.removeWord()
    /// Fetch all the words from backend
    fetch("https://wordmapper-backend.herokuapp.com/words")
    .then(resp => resp.json())
    .then(data => this.findMostCommonWord(data))
  }

  findMostCommonWord = (words) => {
    let wordArr = words.map(word => word.word_name)
    let mostCommon = wordArr.sort((a,b) =>
          wordArr.filter(word => word === a).length
        - wordArr.filter(word => word === b).length
    ).pop();
    this.props.addMostCommonWord(mostCommon)
  }

  handleChange = (e) => {
    /// No special characters or numbers!
    let regex = /[0-9]|`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\_|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g
    if (regex.test(e.target.value)) alert("No numbers or special characters!")
    else {
    this.setState({
      [e.target.name]: e.target.value
    })}
  }

  ///Gets etymology from API
  lookUpWord = (e) => {
    e.preventDefault()
    let word = this.state.word
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.REACT_APP_DICTIONARY_API_KEY}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.length === 0 || data[0].et === undefined) {
        alert("We couldn't find origins for this word!")
        return this.props.removeWord(e)
      } 
      else  {
        this.props.addWord(word, data[0])
        this.compareLanguages()
      }
    })
  }

  ///Extracts languages from etymology string and returns an array of languages
  compareLanguages = () => {
    const {word} = this.props.state 
    if (!word.word)return alert("please enter a valid word")
    else if (word.etymology[0][1] === "origin unknown") {
      alert("Woops, no origin found for this one.")
      return 
    } 
    else {
      let languageArr = word.etymology[0][1].split(" ")
      /// ...new Set prevents duplicates
      let currentLanguages = [...new Set(languageArr)]
      let matchedLanguages = []
      for (let i = 0; i < currentLanguages.length; i++) {
        for (let j = 0; j < this.props.state.allTheLanguages.length; j++) {
          let temp = this.props.state.allTheLanguages[j].split(", ")
          if (currentLanguages[i] == temp[0]) {
            matchedLanguages.push(this.props.state.allTheLanguages[j])
            break
          }
        }
      }
      this.props.addLanguages(matchedLanguages)
      this.getCoordinates()
    }
  }

  ///Finds origin country coordinates for each language!!!
  getCoordinates = () => {
    if (this.props.state.languages.length === 0) alert("Not sure where that one comes from tbh - try a different one!")
    else {
    let coordinatesToRender = []
    let myLanguages = [...this.props.state.languages]
      myLanguages.map((lang => {
      let eachLanguage = lang
      for (let i = 0; this.props.state.languagesToCoordinates.length; i++) {
        for (const language in this.props.state.languagesToCoordinates[i]) {
          if (language == eachLanguage) {
            coordinatesToRender.push(this.props.state.languagesToCoordinates[i][language])
          }
        }
      break 
      }
    }))
    this.props.addCoordinates(coordinatesToRender)
    this.setCoordinates()
    this.sendToMap()
    }
  }

  sendToMap = () => {
    if (this.state.hasCoordinates === false) alert("No location(s) to show you. Try again!")
    else {
      let wordToSend = this.props.state.word.word.toLowerCase()
      this.props.wordPostFetch(wordToSend)
      this.props.history.push('/loading')
    }
  }

  setCoordinates = () => {
    this.setState({
      hasCoordinates: true
    })
  }
  
  render(){
    return(
      <div className="WordForm-component">
        <Navbar />
        <h1 style={{textAlign: 'center', color: 'white'}}>Today's most searched word is...</h1>
        <h2 style={{textAlign: 'center', color: 'white', textTransform: 'uppercase'}}>{this.props.state.mostCommonWord}</h2>
        <form className="form input-field">
        {
          this.props.state.currentUser.username ?
          <h1 className="nice-text">Hello {this.props.state.currentUser.username}. <br/> Enter a word.</h1> :
          <h1 className="nice-text">Hello stranger. <br/> Enter a word.</h1>
        }
          <input className="input-form"
            type="text" 
            value={this.state.word} 
            onChange={this.handleChange}
            name="word"
          /> 
          <input 
            className="submit"
            type="submit"
            onClick={this.lookUpWord}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, {addWord, removeWord, addCoordinates, addLanguages, wordPostFetch, addMostCommonWord})(Dashboard)