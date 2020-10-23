import React from 'react';
import Track from '../Track';

import './SearchField.css';

const SearchField = ({ handleOnChange }) => {
  return (
    <div className='search-box'>
      <input className='search-field' type='text' onChange={handleOnChange} />
    </div>
  );
};

export default SearchField;
