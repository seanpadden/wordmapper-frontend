import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import styled from 'styled-components'
import Geocode from "react-geocode";
import {connect} from 'react-redux'
import {addWord} from '../Redux/actions.js'
import {removeWord} from '../Redux/actions.js'
import {addCoordinates} from '../Redux/actions.js'
import {addEtymology} from '../Redux/actions.js'
import {addLanguages} from '../Redux/actions.js'
import {addDate} from '../Redux/actions.js'
import {addDefinition} from '../Redux/actions.js'
import MapContainer from '../containers/MapContainer.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './Navbar'
import '../WordForm.css'

const dictKey = (process.env.REACT_APP_DICTIONARY_API_KEY)

const allTheLanguages = [ 
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aragonese',
  'Armenian',
  'Assamese',
  'Avaric',
  'Avestan',
  'Aymara',
  'Azerbaijani',
  'Bambara',
  'Bashkir',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bihari',
  'Bislama',
  'Bosnian',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan', 
  'Valencian',
  'Central Khmer',
  'Chamorro',
  'Chechen',
  'Chichewa', 
  'Chewa', 
  'Nyanja',
  'Chinese',
  'Mandarin',
  'Cantonese',
  'Church Slavonic', 
  'Old Bulgarian', 
  'Old Church Slavonic',
  'Slavonic',
  'Chuvash',
  'Cornish',
  'Corsican',
  'Cree',
  'Croatian',
  'Czech',
  'Danish',
  'Divehi', 
  'Dhivehi', 
  'Maldivian',
  'Dutch', 
  'Dutch,',
  'Flemish',
  'Dzongkha',
  'English',
  'English,',
  'Esperanto',
  'Estonian',
  'Egyptian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  "Anglo-French",
  "Anglo-French,",
  'French',
  'French,',
  'Fulah',
  'Gaelic', 
  'Scottish', 
  'Gaelic',
  'Galician',
  'Ganda',
  'Georgian',
  'German',
  'Germanic',
  'Goth',
  'Gothic',
  'German,',
  'Germanic,',
  'Goth,',
  'Gothic,',
  'Gikuyu', 
  'Kikuyu',
  'Greek',
  'Greenlandic', 
  'Kalaallisut',
  'Guarani',
  'Gujarati',
  'Haitian', 
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Herero',
  'Hindi',
  'Hiri Motu',
  'Hungarian',
  'Icelandic',
  'Ido',
  'Igbo',
  'Indonesian',
  'Interlingue',
  'Inuktitut',
  'Inupiaq',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kanuri',
  'Kashmiri',
  'Kazakh',
  'Kinyarwanda',
  'Komi',
  'Kongo',
  'Korean',
  'Kwanyama', 
  'Kuanyama',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Letzeburgesch', 
  'Luxembourgish',
  'Limburgish', 
  'Limburgan', 
  'Limburger',
  'Lingala',
  'Lithuanian',
  'Luba-Katanga',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Manx',
  'Maori',
  'Marathi',
  'Marshallese',
  'Moldovan', 
  'Moldavian', 
  'Romanian',
  'Mongolian',
  'Nauru',
  'Navajo', 'Navaho',
  'Northern Ndebele',
  'Ndonga',
  'Nepali',
  'Northern Sami',
  'Norwegian',
  'Nordic',
  'Norse',
  'Norwegian Bokmål',
  'Norwegian Nynorsk',
  'Nuosu', 
  'Sichuan Yi',
  'Occitan',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Ossetian', 
  'Ossetic',
  'Pali',
  'Panjabi', 
  'Punjabi',
  'Pashto', 
  'Pushto',
  'Persian',
  'Polish',
  'Portuguese',
  'Quechua',
  'Romansh',
  'Rundi',
  'Russian,',
  'Russian',
  'Samoan',
  'Sango',
  'Sanskrit',
  'Sardinian',
  'Serbian',
  'Shona',
  'Sindhi',
  'Sinhala', 'Sinhalese',
  'Slovak',
  'Slovenian',
  'Somali',
  'Sotho, Southern',
  'South Ndebele',
  'Spanish', 
  'Castilian',
  'Sundanese',
  'Swahili',
  'Swati',
  'Swedish',
  'Tagalog',
  'Tahitian',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tonga (Tonga Islands)',
  'Tsonga',
  'Tswana',
  'Turkish',
  'Turkmen',
  'Twi',
  'Uighur', 
  'Uyghur',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Venda',
  'Vietnamese',
  'Volap_k',
  'Walloon',
  'Welsh',
  'Western Frisian',
  'Wolof',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zhuang', 
  'Chuang',
  'Zulu' 
];

const  languagesToCoordinates = [{
  English: {lat: 54.0000, lng: -2.0000},
  "English,": {lat: 54.0000, lng: -2.0000},
  "Anglo-French": {lat: 46.0000, lng: 2.0000},
  "Anglo-French,": {lat: 46.0000, lng: 2.0000},
  French: {lat: 46.0000, lng: 2.0000},
  "French,": {lat: 46.0000, lng: 2.0000},
  German: {lat: 51.1657, lng: 10.4515},
  "German,": {lat: 51.1657, lng: 10.4515},
  Germanic: {lat: 51.1657, lng: 10.4515},
  "Germanic,": {lat: 51.1657, lng: 10.4515},
  Goth: {lat: 51.1657, lng: 10.4515},
  "Goth,": {lat: 51.1657, lng: 10.4515},
  Gothic: {lat: 51.1657, lng: 10.4515},
  "Gothic,": {lat: 51.1657, lng: 10.4515},
  Dutch: {lat: 52.1326, lng: 5.2913},
  "Dutch,": {lat: 52.1326, lng: 5.2913},
  Greek: {lat: 37.9838, lng: 23.7275},
  "Greek,": {lat: 37.9838, lng: 23.7275},
  Latin: {lat: 41.8719, lng: 12.5674},
  "Latin,": {lat: 41.8719, lng: 12.5674},
  Italian: {lat: 41.8719, lng: 12.5674},
  "Italian,": {lat: 41.8719, lng: 12.5674},
  Spanish: {lat: 40.4637, lng: 3.7492},
  "Spanish,": {lat: 40.4637, lng: 3.7492},
  Castilian: {lat: 40.4637, lng: 3.7492},
  "Castilian,": {lat: 40.4637, lng: 3.7492},
  Egyptian: {lat: 26.8206, lng: 30.8025},
  "Egyptian,": {lat: 26.8206, lng: 30.8025},
  Nordic: {lat: 60.4720, lng: 8.4689},
  "Nordic,": {lat: 60.4720, lng: 8.4689},
  Norwegian: {lat: 60.4720, lng: 8.4689},
  "Norwegian,": {lat: 60.4720, lng: 8.4689},
  Norse: {lat: 60.4720, lng: 8.4689},
  "Norse,": {lat: 60.4720, lng: 8.4689},
  Arabic: {lat: 23.8859, lng: 45.0792},
  "Arabic,": {lat: 23.8859, lng: 45.0792},
  Gaelic: {lat: 53.4129, lng: 8.2439},
  'Gaelic,': {lat: 53.4129, lng: 8.2439},
  Russian: {lat: 61.5240, lng: 105.3188},
  "Russian,": {lat: 61.5240, lng: 105.3188},
  Chinese: {lat: 35.8617, lng: 104.1954},
  "Chinese,": {lat: 35.8617, lng: 104.1954},
  Sanskrit: {lat: 35.8617, lng: 104.1954}, 
  "Sanskrit,": {lat: 35.8617, lng: 104.1954}, 
  Hindi: {lat: 20.5937, lng: 78.9629},
  "Hindi,": {lat: 20.5937, lng: 78.9629},
  "Old Church Slavonic": {lat: 48.6690, lng: 19.6990},
  "Old Church Slavonic,": {lat: 48.6690, lng: 19.6990},
  Slavonic: {lat: 48.6690, lng: 19.6990}


}]

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ProgressBarContainer = styled.div`
  width: 300px;
  margin-top: 200px
`

class WordInput extends Component {

  state = {
    word: '',
    wordNotFound: false,
    username: '',
    percentage: 0,
    hasCoordinates: false,
    btn1: 'is-paused',
    btn2: 'is-paused',
    btn3: 'is-paused'
  }
  
  renderSecondButton = () => {
    this.setState({
      btn1: ""
    })
  }

  renderThirdButton = () => {
    this.setState({
      btn2: ""
    })
  }
  renderFourthButton = () => {
    this.setState({
      btn3: ""
    })
  }

  componentDidMount(){
    this.props.removeWord()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  ///Gets etymology from API
  lookUpWord = (e) => {
    e.preventDefault()
    let word = this.state.word
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
    .then(resp => resp.json())
    .then(data => {
      if (data[0].et === undefined) {
        alert("We couldn't find origins for this word!")
        this.props.removeWord(e)
        this.setState({
          wordNotFound: true,
        })
      } 
      else  {
        debugger 
        this.props.addWord(word)
        this.props.addDate(data[0].date)
        this.props.addDefinition(data[0].shortdef)
        this.props.addEtymology(data[0].et)
        this.increaseBar()
        this.renderSecondButton()
        this.setState({
          wordNotFound: false,
        })
      }
    })
  }

  ///Extracts languages from etymology string and returns an array of languages
  compareLanguages = (e) => {
    // e.preventDefault()
    if (this.props.state.word === ""){
      alert("please enter a valid word")
      this.setState({
        percentage: this.state.percentage = 0
      })
    }
    else if (this.props.state.etymology[0][1] === "origin unknown") {
      alert("Woops, no origin found for this one.")
    } else {
    let copiedStr = this.props.state.etymology[0][1]
    let arr = copiedStr.split(" ")
    /// ...new Set prevents duplicates
    let currentLanguages = [...new Set(arr)]
    let matchedLanguages = []

    for (let i = 0; i < currentLanguages.length; i++) {
      for (let j = 0; j < allTheLanguages.length; j++) {
        let temp = allTheLanguages[j].split(", ")
        if (currentLanguages[i] == temp[0]) {
          matchedLanguages.push(allTheLanguages[j])
          break
        }
      }
    }
    this.props.addLanguages(matchedLanguages)
    this.increaseBar()
    this.renderThirdButton()
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
        for (let i=0; languagesToCoordinates.length; i++) {
          for (const language in languagesToCoordinates[i]) {
            if (language == eachLanguage) {
              coordinatesToRender.push(languagesToCoordinates[i][language])
            }
          }
        break 
      }
    }))
    this.props.addCoordinates(coordinatesToRender)
    this.increaseBar()
    this.setCoordinates()
    this.renderFourthButton()
    }
  }

  sendToMap = () => {
    if (this.state.hasCoordinates === false) {
      alert("No location(s) to show you. Try again!")
      this.setState({
        percentage: this.state.percentage = 0
      })
    } else {
      this.props.history.push('/newmap')
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
        {
          this.props.state.currentUser.username ?
          <h1 className="nice-text">Hello {this.props.state.currentUser.username}. <br/> Enter a word.</h1> :
          <h1 className="nice-text">Hello stranger. <br/> Enter a word.</h1>
        }
        {/* {this.state.wordNotFound 
          ? 
          <p style={{color: 'white'}}>Sorry! Webster doesn't know this one -_- Try again?</p>
          :
          null} */}
        <form>
          <input className="btn-success"
            type="text" 
            value={this.state.word} 
            onChange={this.handleChange}
            name="word"
          /> 
        <br />
        <br />
          <input 
            className="btn-success"
            type="submit"
            onClick={this.lookUpWord}
          />
        </form>
        <div>
        <br />
          <button className={`btn-success fade-in ${this.state.btn1}`} onClick={this.compareLanguages}>Find Lanuages</button>
        </div>
        <div>
        <br />
          <button className={`btn-success fade-in ${this.state.btn2}`} onClick={this.getCoordinates}>Get coordinates</button>
          <br />
          <br />
          <button className={`btn-success fade-in ${this.state.btn3}`} onClick={this.sendToMap}>Generate your map!</button>
        </div>
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

export default connect(mapStateToProps, {addWord, removeWord, addCoordinates, addEtymology, addLanguages, addDate, addDefinition})(WordInput)