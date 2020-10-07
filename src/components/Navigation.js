import React, { useState, useContext } from 'react';
import './Navigation.css';
import { PhotoContext } from '../context';

import SearchIcon from '@material-ui/icons/Search';

function Navigation({ setURL, setParams }) {
  const { dispatch } = useContext(PhotoContext);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query === '') return;
    setParams((prevParams) => {
      if (prevParams.query !== query) {
        dispatch({ type: 'CLEAR_DATA' });
      }
      return { ...prevParams, query };
    });
    setURL('/search/photos');
  };

  return (
    <header>
      <ul className='navbar'>
        <li>
          <a href='/' className='navbar__logo'>
            <svg
              width='32'
              height='32'
              version='1.1'
              viewBox='0 0 32 32'
              aria-labelledby='unsplash-home'
              aria-hidden='false'
            >
              <title id='unsplash-home'>Unsplash Home</title>
              <path d='M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z'></path>
            </svg>
            <h1>Images Gallery</h1>
          </a>
        </li>
        <li className='navbar__search'>
          <button type='button' onClick={handleSearch}>
            <SearchIcon />
          </button>
          <input
            type='text'
            name='searchbar'
            value={query}
            id='search1'
            placeholder='Search free high-resolution images'
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
