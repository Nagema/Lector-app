import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useMediaQuery from "react-responsive";
import iconMenu from "../../assets/images/icon-menu.svg";
import iconClose from "../../assets/images/icon-close-menu.svg";
import { CategoryBoxOptions } from "../CategoryBoxOptions/CategoryBoxOptions";

export const NavbarComponent = () => {
  const isWide = useMediaQuery({
    query: "(min-width: 1023px)",
  });
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [menuIcon, setMenuIconToggle] = useState(true);

  const handleFeatureLink = () => {
    setCategoryToggle(!categoryToggle);
  };

  const handleMenuIcon = () => {
    setMenuIconToggle(!menuIcon);
  };

  const handleBoxClose = () => {
    setCategoryToggle(false);
  }
  return (
    <div>
      <nav className="navbar_menu">
        <div className="logo">
          <FontAwesomeIcon icon={faNewspaper} />
        </div>
        {menuIcon ? (
          <button className="toggle_button" onClick={handleMenuIcon}>
            <img src={iconMenu} alt="menu icon" />
          </button>
        ) : (
          <div className="navbar_menu__wrapper">
            <button className="toggle_button" onClick={handleMenuIcon}>
              <img src={iconClose} alt="menu icon" />
            </button>
            <ul className="navbar_menu__list">
              <li>
                <Link to="/" onClick={handleBoxClose}>
                  Home
                </Link>
              </li>
              <li onClick={handleFeatureLink}> Categorias
                {categoryToggle &&  <CategoryBoxOptions />}
              </li>
              <li>
                <Link to="/" onClick={handleBoxClose}>
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="search_input">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Buscar" />
      </div>
    </div>
  );
};
