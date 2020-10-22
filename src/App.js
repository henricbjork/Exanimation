import React, { useState } from 'react';

import queryString from 'query-string';

import './App.css';
import { Router } from '@reach/router';

import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';

function App() {
  return (
    <div className='App'>
      <Router>
        <HomePage path='/' loggedIn={true} />
        <LoginPage path='/login' />
      </Router>
    </div>
  );
}

export default App;
