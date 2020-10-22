import React from 'react';

//Packages
import { Router } from '@reach/router';

//Pages
import HomePage from './pages/Home/home';
import LoginPage from './pages/Login/login';

//CSS
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <HomePage path='/' />
        <LoginPage path='/login' />
      </Router>
    </div>
  );
}

export default App;
