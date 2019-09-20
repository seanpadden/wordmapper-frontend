import React, { Component } from 'react';
import Geocode from "react-geocode";

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

class WordInput extends Component {

  state = {
    word: '',
    etymology: [[]],
    languages: [],
    currentLocation: {
        lat: 0, 
        lng: 0
      }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  lookUpWord = (e) => {
    e.preventDefault()
    let word = this.state.word
    fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
    .then(resp => resp.json())
    .then(data => this.setState({
      etymology: data[0].et
    }))
  }

  //// THIS COMPARES OUR LANGUAGE ARRAY AGAINST OUR ETYMOLOGY STRING.
  //// IT WORKS, BUT IT'S ONLY RETURNING THE LAST THING. NEED TO FIGURE THAT OUT.
  //// AFTER THAT, WE NEED TO CONVERT THE LANGUAGE NAME TO COINCIDE WITH COUNTRY NAME/COORDINATES
  compareLanguages = (e) => {
    e.preventDefault()
    const getLanguages = allTheLanguages.map(language => {
      let copiedStr = this.state.etymology[0][1]
      let arr = copiedStr.split(" ")
      let distinctArr = [...new Set(arr)]
      const result = distinctArr.filter(strObj => strObj.includes(language))
      if (result.length > 0){
        this.setState({
          languages: [...this.state.languages, result]
        })
      }
    })
  }

  /// GEOCODING WORKING! JUST NEED LANGUAGE NAME TO CORRESPOND WITH COORDINATES.
  getCoordinates = () => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.fromAddress("germany").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("lat:", lat, "lng:", lng)
        this.setState({
          currentLocation: {
            lat: lat,
            lng: lng
          }
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  render(){
    console.log(this.state.word)
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
          <button onClick={this.getCoordinates}>Generate your map!</button>
        </div>
      </div>
    )
  }
}

export default WordInput