import React, { Component } from 'react';
import './App.css';
import ProfilePage from './components/ProfilePage.js'
import { Switch, Route } from 'react-router-dom'
import WordForm from './components/WordForm.js'
import LoginSignupContainer from './containers/LoginSignupContainer.js'
import LoadingScreen from './components/LoadingScreen.js'
import LogOut from './components/LogOut.js'
import WordMapContainer from './containers/WordMapContainer.js'
  
class App extends Component {

render(){
return (
  <div className="App">
    <Switch>
      <Route exact path={'/'} render={routerProps => <LoginSignupContainer {...routerProps} />} />
      <Route path={'/login'} render={routerProps => <LoginSignupContainer {...routerProps} />} />
      <Route
        path={'/profile'}
        render={routerProps => <ProfilePage {...routerProps} />} />
      <Route path={'/input'} component={WordForm} />
      <Route path={'/loading'} component={LoadingScreen} />
      <Route path={'/logout'} component={LogOut} />
      <Route path={'/map'} component={WordMapContainer} />
    </Switch>
  </div>
)}
}

export default App;
