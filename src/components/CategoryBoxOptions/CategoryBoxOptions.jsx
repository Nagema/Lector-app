import React, { useContext } from 'react'
import "./styles.css";
import { News } from '../../context/NewsContext'
import { Link } from "react-router-dom";

export const CategoryBoxOptions = () => {

  const { news } = useContext(News);

  const categorySet = new Set(news.map((item) => item.category));
  const categories = Array.from(categorySet);

  return (
      <ul className='categoty_options__wrapper'>
      {categories.map((category) =>
        <li key={category}> 
          <Link to={`/news/${category}`} >
            {category}
          </Link>
        </li>
      )}
      </ul>
  )
}
