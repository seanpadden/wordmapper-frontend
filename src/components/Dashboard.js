import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  addWord, 
  removeWord, 
  addCoordinates, 
  addLanguages, 
  wordPostFetch, 
  addMostCommonWord,
  getLanguageCoordinates
} from '../Redux/actions.js'
import Navbar from './Navbar'
import '../styles/css/WordForm.css'
import {validateWord, cleanUpEtymologyStr} from '../lib/helpers.js'

class Dashboard extends Component {

  state = {
    word: '',
  }

  componentDidMount(){
    if (!localStorage.token || !this.props.state.currentUser.username) {
      this.props.history.push('/login')
    }
    this.props.removeWord()
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
    if (validateWord(e.target.value)) this.setState({[e.target.name]: e.target.value})
  }

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
        this.findWordOrigins()
      }
    })
  }

  findWordOrigins = () => {
    const { wordObj } = this.props.state
    if (!wordObj.word) return alert("Please enter a valid word")
    else if (wordObj.etymology[0][1] === "Origin unknown") {
      alert("Woops, no origin found for this word.")
      return 
    } 
    else {
      const etymologyStr = cleanUpEtymologyStr(wordObj.etymology[0][1])
      if (etymologyStr !== undefined) {
        const etymologyArr = [...new Set(etymologyStr.split(" "))]
        this.props.wordPostFetch(wordObj.word.toLowerCase())
        this.props.getLanguageCoordinates(etymologyArr, this.props.history)
      }
    }
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

export default connect(mapStateToProps, { 
  addWord, 
  removeWord, 
  addCoordinates, 
  addLanguages, 
  wordPostFetch,
  getLanguageCoordinates, 
  addMostCommonWord})(Dashboard)