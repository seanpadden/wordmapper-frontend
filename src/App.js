import React, { Component } from 'react';
import './App.css';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import WordForm from './components/WordForm.js'
import MapContainer from './containers/MapContainer.js'
import LoadingScreen from './components/LoadingScreen.js'
import Word from './components/Word.js'
import Navbar from './components/Navbar.js'
import LogOut from './components/LogOut.js'

  
class App extends Component {

render(){
return (
  <div className="App">
    <Navbar/>
    <Switch>
      <Route
        path={'/profile'}
        render={routerProps => <ProfilePage {...routerProps} />} />
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/signup'} component={SignUpPage} />
      <Route path={'/input'} component={WordForm} />
      <Route path={'/map'} component={MapContainer} />
      <Route path={'/loading'} component={LoadingScreen} />
      <Route path={'/logout'} component={LogOut} />
    </Switch>
  </div>
)}
}

export default App;
