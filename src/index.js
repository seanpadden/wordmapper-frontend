import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'

//createStore is a function
import { createStore } from 'redux'
import reducer from './Redux/reducer'

import {Provider} from 'react-redux'

const storeObj = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
<Provider store={storeObj}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, 
document.getElementById('root'));
