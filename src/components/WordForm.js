import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {addWord} from '../Redux/actions.js'
import {removeWord} from '../Redux/actions.js'
import {addCoordinates} from '../Redux/actions.js'
import {addEtymology} from '../Redux/actions.js'
import {addLanguages} from '../Redux/actions.js'
import {addDate} from '../Redux/actions.js'
import {addDefinition} from '../Redux/actions.js'
import {wordPostFetch} from '../Redux/actions.js'
import {addMostCommonWord} from '../Redux/actions.js'
import Navbar from './Navbar'
import '../WordForm.css'

///API KEY\\\
const dictKey = (process.env.REACT_APP_DICTIONARY_API_KEY)

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ProgressBarContainer = styled.div`
  width: 300px;
  margin-top: -6em;
`

class WordInput extends Component {

  state = {
    word: '',
    username: '',
    percentage: 0,
    hasCoordinates: false
  }

  /// If user is not logged in, send them back to login page. 
  componentDidMount(){
    if (!localStorage.token || !this.props.state.currentUser.username) {
      this.props.history.push('/login')
    } 
    /// Refresh Redux word state 
    this.props.removeWord()
    /// Fetch all the words from backend
    fetch("https://wordmapper-backend.herokuapp.com/words")
    .then(resp => resp.json())
    .then(data => this.findMostCommonWord(data))
  }

  /// Find the current most searched word and render it
  findMostCommonWord = (words) => {
    let wordArr = words.map(word => word.word_name)
    let mostCommon = wordArr.sort((a,b) =>
          wordArr.filter(v => v===a).length
        - wordArr.filter(v => v===b).length
    ).pop();
      this.props.addMostCommonWord(mostCommon)
    }

  handleChange = (e) => {
    /// No special characters or numbers!
    let regex = /[0-9]|`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\_|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g
    if (regex.test(e.target.value)) {
      alert("No numbers or special characters!")
    } else {
    this.setState({
      [e.target.name]: e.target.value
    })}
  }

  ///Gets etymology from API
  lookUpWord = (e) => {
    e.preventDefault()
    let word = this.state.word
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      if (data.length === 0 || data[0].et === undefined) {
        alert("We couldn't find origins for this word!")
        this.props.removeWord(e)
      } 
      else  {
        this.props.addWord(word)
        this.props.addDate(data[0].date)
        this.props.addDefinition(data[0].shortdef)
        this.props.addEtymology(data[0].et)
        this.increaseBar()
      }
      setTimeout(() => this.compareLanguages(), 500)
    })
  }

  ///Extracts languages from etymology string and returns an array of languages
  compareLanguages = (e) => {
    if (this.props.state.word === ""){
      alert("please enter a valid word")
      this.setState({
        percentage: 0
      })
    }
    else if (this.props.state.etymology[0][1] === "origin unknown") {
      alert("Woops, no origin found for this one.")
    } 
    else {
      let etymologyStr = this.props.state.etymology[0][1]
      let languageArr = etymologyStr.split(" ")
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
      this.increaseBar()
      setTimeout(() => this.getCoordinates(), 500)
    }
  }

  ///Finds origin country coordinates for each language!!!
  getCoordinates = () => {
    if (this.props.state.languages.length === 0){
      alert("We dunno where that one comes from tbh - try a different one!")
      this.setState({
        percentage: this.state.percentage = 0
      })
    } 
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
    this.increaseBar()
    this.setCoordinates()
    setTimeout(() => this.sendToMap(), 500)

    }
  }

  sendToMap = () => {
    if (this.state.hasCoordinates === false) {
      alert("No location(s) to show you. Try again!")
      this.setState({
        percentage: this.state.percentage = 0
      })
    } else {
      let wordToSend = this.props.state.word.toLowerCase()
      this.props.wordPostFetch(wordToSend)
      this.props.history.push('/loading')
    }
  }

  setCoordinates = () => {
    this.setState({
      hasCoordinates: true
    })
  }

  increaseBar = (e) => {
    this.setState({
      percentage: this.state.percentage + Math.round(33.6)
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
        <InputWrapper>
          <ProgressBarContainer>
            <ProgressBar percentage={this.state.percentage} />
          </ProgressBarContainer>
        </InputWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps, {addWord, removeWord, addCoordinates, addEtymology, addLanguages, addDate, addDefinition, wordPostFetch, addMostCommonWord})(WordInput)