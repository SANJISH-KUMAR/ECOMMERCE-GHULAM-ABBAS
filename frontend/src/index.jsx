import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

//import reportWebVitals from './reportWebVitals';

// gets the div id = "root" from index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// renders in index.html root element App.js functionality
root.render(
  <Provider store={store}>
    {/* Loads App.js Components into index.html */}
    <App />
  </Provider>
);

//reportWebVitals();
