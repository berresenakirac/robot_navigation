import React from 'react';
import ReactDOM from 'react-dom/client';
import"./bootstrap/minty-bootstrap.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// /WebVitals(console.log))/ If you want to start measuring performance in your app, pass a function
// to log results (for example: report
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
