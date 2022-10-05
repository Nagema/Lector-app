import React, { useContext } from "react";
import "./styles.css";
import { News } from "../../context/NewsContext";
import { NavLink } from "react-router-dom";

export const CategoryBoxOptions = () => {
  const { news } = useContext(News);

  const categorySet = new Set(news.map((item) => item.category));
  const categories = Array.from(categorySet);

  return (
    <ul className="categoty_options__dropdown">
      {categories.map((category) => (
        <li key={category}>
          <NavLink
            to={`/news/${category}`}
            className={({ isActive }) => (isActive ? "link_active" : "")}
          >
            {category}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
