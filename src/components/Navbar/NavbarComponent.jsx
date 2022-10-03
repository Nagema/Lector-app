import React from 'react'
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faNewspaper } from '@fortawesome/free-solid-svg-icons';

export const NavbarComponent = () => {
  return (
    <div>
        <nav className='navbar_menu'>
          <div className='logo'>
            <FontAwesomeIcon icon={faNewspaper}/>
          </div>
          <ul className='navbar_menu__list'>
            <li>Home</li>
            <li>News</li>
            <li>Favorites</li>
          </ul>
          <div className='search_input'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" placeholder='Search' />
          </div>
        </nav>
    </div>
  )
}
