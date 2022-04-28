import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './config/reportWebVitals';
import { LoginPage } from "./pages/login_page";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";
import './index.css';

//Initialize firebase
import './config/firebase';

ReactDOM.render(
  <React.StrictMode>
      <LoginPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
