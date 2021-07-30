import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'weather-icons/css/weather-icons.css'
import 'weather-icons/css/weather-icons-wind.min.css'
import './scss/bs_custom.scss';
import './scss/style.scss';
import App from './App';
require('dotenv').config()

ReactDOM.render(
  <App />, document.getElementById('root')
);

