import React, { Component } from 'react';
import './App.css';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import WordForm from './components/WordForm.js'
import MapContainer from './containers/MapContainer.js'
import LoginSignupContainer from './containers/LoginSignupContainer.js'
import LoadingScreen from './components/LoadingScreen.js'
import Word from './components/Word.js'
import Navbar from './components/Navbar.js'
import LogOut from './components/LogOut.js'
import WordMapContainer from './containers/WordMapContainer.js'


  
class App extends Component {

render(){
return (
  <div className="App">
    <Switch>
      <Route
        path={'/profile'}
        render={routerProps => <ProfilePage {...routerProps} />} />
      <Route path={'/login'} render={routerProps => <LoginSignupContainer {...routerProps} />} />
      <Route path={'/input'} component={WordForm} />
      <Route path={'/map'} component={MapContainer} />
      <Route path={'/loading'} component={LoadingScreen} />
      <Route path={'/logout'} component={LogOut} />
      <Route path={'/newmap'} component={WordMapContainer} />
    </Switch>
  </div>
)}
}

export default App;
