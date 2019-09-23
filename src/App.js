import React, { Component } from 'react';
import './App.css';
import ProfilePage from './components/ProfilePage.js'
import LoginPage from './components/LoginPage.js'
import SignUpPage from './components/SignUpPage.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import WordForm from './components/WordForm.js'
import MapContainer from './containers/MapContainer.js'



const dictKey = (process.env.REACT_APP_DICTIONARY_API_KEY)
  
class App extends Component {

  state = {
    username: '',
  }



  

render(){
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
    <Route path={'/map'} component={MapContainer} />
  </Switch>
  </div>
)}
}

export default App;
