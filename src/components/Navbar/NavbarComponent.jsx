import React, { useState, useContext } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import iconMenu from "../../assets/images/icon-menu.svg";
import iconClose from "../../assets/images/icon-close-menu.svg";
import { CategoryBoxOptions } from "../CategoryBoxOptions/CategoryBoxOptions";
import { Search } from "../../context/SearchContext";

export const NavbarComponent = () => {
  const isWide = useMediaQuery({
    query: "(min-width: 1023px)",
  });
  const navbarListStyle = isWide
    ? "navbar_menu__list__desktop"
    : "navbar_menu__list__mobile";
  const { pathname } = useLocation();
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
  };

  const activeLinkClass = ({ isActive }) =>
    "link" + (isActive ? " link_active" : "");

  const isCategoryPage = pathname.startsWith("/news/");

  const { searchInput, setSearchInput } = useContext(Search);
  return (
    <div>
      <nav className="navbar_menu">
        <NavLink to="/" className="logo_wrapper">
          <FontAwesomeIcon className="fa-xl" icon={faNewspaper} />
          <p>Infointelygenz</p>
        </NavLink>
        {menuIcon && !isWide ? (
          <button className="toggle_button" onClick={handleMenuIcon}>
            <img
              className="toggle_button__menu"
              src={iconMenu}
              alt="menu icon"
            />
          </button>
        ) : (
          <div className="navbar_menu__wrapper">
            {!isWide && (
              <button className="toggle_button" onClick={handleMenuIcon}>
                <img
                  className="toggle_button__close"
                  src={iconClose}
                  alt="menu icon"
                />
              </button>
            )}
            <ul className={navbarListStyle}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={activeLinkClass}
                  onClick={handleBoxClose}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/favorites"}
                  className={activeLinkClass}
                  onClick={handleBoxClose}
                >
                  Favoritos
                </NavLink>
              </li>
              <li onClick={handleFeatureLink}>
                <span className={isCategoryPage ? "link_active" : ""}>
                  Categorias
                </span>
                {categoryToggle && <CategoryBoxOptions />}
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="search_input">
        <input
          className="input_elevated"
          type="text"
          placeholder="Buscar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
};
