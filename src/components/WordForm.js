import React, { Component } from 'react';
// import Word from './components/Word'
import Geocode from "react-geocode";
import {connect} from 'react-redux'
import {addWord} from '../Redux/actions.js'
import {addCoordinates} from '../Redux/actions.js'
import {addEtymology} from '../Redux/actions.js'
import MapContainer from '../containers/MapContainer.js'
import { Switch, Route, withRouter } from 'react-router-dom'


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
  French: {lat: 46.0000, lng: 2.0000},
  German: {lat: 51.1657, lng: 10.4515},
  Dutch: {lat: 52.1326, lng: 5.2913},
}]

class WordInput extends Component {

  state = {
    word: "",
    etymology: [[]],
    languages: [],
    coordinates: [],

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
    this.props.addWord(word)
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      etymology: data[0].et
    }))
  }

  ///Extracts languages from etymology string and returns an array of languages
  compareLanguages = (e) => {
    e.preventDefault()
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
    this.setState({
      languages: matchedLanguages
    })
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
    this.props.addEtymology(this.state.etymology)
    this.props.history.push('/map')
  }


  render(){
    return(
      <div>
        <h1>HELLO ENTER WORDS</h1>
        <form>
          <input 
            type="text" 
            value={this.state.word} 
            onChange={this.handleChange}
            name="word"
          /> 
          <input 
            type="submit"
            onClick={this.lookUpWord}
          />
        </form>
        <div>
          <button onClick={this.compareLanguages}>Find Lanuages</button>
        </div>
        <div>
          <button onClick={this.getCoordinates}>Get coordinates</button>
          <button onClick={this.sendToMap}>Generate your map!</button>
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

///First arg of connect is to "GET" information 
///Second arg of connect is to "SET" information

/// NOW IMPORTING ACTION INSTEAD OF MAPDISPATCH
export default connect(null, {addWord, addCoordinates, addEtymology})(WordInput)