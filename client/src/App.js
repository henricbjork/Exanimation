import React from 'react';

//Packages
import { Router } from '@reach/router';

//Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

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
