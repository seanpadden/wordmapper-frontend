import React, { Component } from 'react';
// import Word from '../components/Word'
import Geocode from "react-geocode";
import {connect} from 'react-redux'
import {addWord} from '../Redux/actions.js'
import {removeWord} from '../Redux/actions.js'

import {addCoordinates} from '../Redux/actions.js'
import {addEtymology} from '../Redux/actions.js'
import {addLanguages} from '../Redux/actions.js'
import MapContainer from '../containers/MapContainer.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

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
  'Flemish',
  'Dzongkha',
  'English',
  'Esperanto',
  'Estonian',
  'Egyptian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
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
  "Anglo-French": {lat: 46.0000, lng: 2.0000},
  French: {lat: 46.0000, lng: 2.0000},
  German: {lat: 51.1657, lng: 10.4515},
  Germanic: {lat: 51.1657, lng: 10.4515},
  Goth: {lat: 51.1657, lng: 10.4515},
  Gothic: {lat: 51.1657, lng: 10.4515},
  Dutch: {lat: 52.1326, lng: 5.2913},
  Greek: {lat: 37.9838, lng: 23.7275},
  Latin: {lat: 41.8719, lng: 12.5674},
  Italian: {lat: 41.8719, lng: 12.5674},
  Spanish: {lat: 40.4637, lng: 3.7492},
  Castilian: {lat: 40.4637, lng: 3.7492},
  Egyptian: {lat: 26.8206, lng: 30.8025},
  Nordic: {lat: 60.4720, lng: 8.4689},
  Norwegian: {lat: 60.4720, lng: 8.4689},
  Norse: {lat: 60.4720, lng: 8.4689},
  Arabic: {lat: 23.8859, lng: 45.0792},
  Gaelic: {lat: 53.4129, lng: 8.2439},
  "Russian,": {lat: 61.5240, lng: 105.3188},
  Russian: {lat: 61.5240, lng: 105.3188},
  Chinese: {lat: 35.8617, lng: 104.1954},
  Sanskrit: {lat: 35.8617, lng: 104.1954}, 
  Hindi: {lat: 20.5937, lng: 78.9629}

}]

class WordInput extends Component {

  state = {
    word: "",
    etymology: [[]],
    languages: [],
    coordinates: [],
    wordNotFound: false,
    username: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/profile',{
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(user => this.setState({username: user.username}))
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
    // .then(data => this.setState({
    //   etymology: data[0].et
    // }))
    .then(data => {
      if (data[0].et === undefined) {
        this.props.removeWord(e)
        this.setState({
          wordNotFound: true,
          word: ""
        })
      } 
      else  {
      this.props.addWord(word)
      this.props.addEtymology(data[0].et)

      this.setState({
        wordNotFound: false,
        etymology: data[0].et
      })
    }
  })
  }

  ///Extracts languages from etymology string and returns an array of languages
  compareLanguages = (e) => {
    e.preventDefault()
    if (this.props.state.word === ""){
      alert("please enter a valid word")
    }
    else if (this.state.etymology[0][1] === "origin unknown") {
      alert("Woops, no origin found for this one.")
    } else {
    let copiedStr = this.state.etymology[0][1]
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
    this.setState({
      languages: matchedLanguages
    })
  }
  }

  ///Finds origin country coordinates for each language!!!
  getCoordinates = () => {
    let coordinatesToRender = []
    let myLanguages = [...this.state.languages]
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
    this.setState({
      coordinates: coordinatesToRender
    })
    this.props.addCoordinates(coordinatesToRender)
  }

  /// GEOCODING WORKING! JUST NEED LANGUAGE NAME TO CORRESPOND WITH COORDINATES.
  // getCoordinates = () => {
  //   Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  //   Geocode.fromAddress("brazil").then(
  //     response => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log("lat:", lat, "lng:", lng)
  //       this.setState({
  //         currentLocation: {
  //           lat: lat,
  //           lng: lng
  //         }
  //       })
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }

  sendToMap = () => {
    if (this.props.state.word !== "") {
    this.props.history.push('/loading')
    } else {
      alert("you need a word for a map!")
    }
  }

  render(){
    console.log(this.state.languages)
    return(
      <div>
        <Navbar />
        {
          this.state.username ?
          <h1>Hi {this.state.username}, enter a word plz</h1> :
          <h1>Login first plz</h1>
        }
        {/* <h1>Hi, {this.props.state.currentUser}. Enter a word.</h1> */}
        <form>
          <input 
            type="text" 
            value={this.state.word} 
            onChange={this.handleChange}
            name="word"
          /> 
          <br />
          <input 
            type="submit"
            onClick={this.lookUpWord}
          />
        </form>
        <div>
        <br />
          <button onClick={this.compareLanguages}>Find Lanuages</button>
        </div>
        <div>
        <br />
          <button onClick={this.getCoordinates}>Get coordinates</button>
          <br />
          <button onClick={this.sendToMap}>Generate your map!</button>
        </div>
        <div>
          {this.state.wordNotFound 
          ? 
          <h1>Sorry! Webster doesn't know this one -_- Try again?</h1>
          :
          null}
        </div>
      </div>
    )
  }
}


////VIA MAP DISPATCH
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addWord: (word) => {dispatch({type: "ADD_WORD", payload: word})}
//   }
// }

const mapStateToProps = (state) => {
  return {
    state
  }
}

///First arg of connect is to "GET" information 
///Second arg of connect is to "SET" information

/// NOW IMPORTING ACTION INSTEAD OF MAPDISPATCH
export default connect(mapStateToProps, {addWord, removeWord, addCoordinates, addEtymology, addLanguages})(WordInput)