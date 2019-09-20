import React, { Component } from 'react';
import './App.css';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import WordInput from './components/WordInput.js'


const dictKey = (process.env.REACT_APP_DICTIONARY_API_KEY)



const  languagesToCoordinates = [{
  English: {lat: 54.0000, lng: -2.0000},
  French: {lat: 46.0000, lng: 2.0000},
  German: {lat: 51.1657, lng: 10.4515}
}]
  
class App extends Component {

  state = {
    username: '',
  //   word: '',
  //   etymology: [[]],
  //   languages: [],
  //   currentLocation: 
  //   {
  //     lat: 0, lng: 0
  //   }
  }



  

render(){
  console.log(this.props)
return (
  <div className="App">
  {/* vvv API TESTING vvv */}
    

  {/* ^^^ API TESTING ^^^ */}
 <Switch>
    <Route
      path={'/profile'}
      render={routerProps => <ProfilePage {...routerProps} username={this.state.username}/>} />
    <Route path={'/login'} component={LoginPage} />
    <Route path={'/signup'} component={SignUpPage} />
    <Route path={'/input'} component={WordInput} />
  </Switch>
  </div>
)}
}

export default App;
