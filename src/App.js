import React, { Component } from 'react';
import './App.css';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import WordForm from './components/WordForm.js'


const dictKey = (process.env.REACT_APP_DICTIONARY_API_KEY)
  
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
    <Route path={'/input'} component={WordForm} />
  </Switch>
  </div>
)}
}

export default App;
