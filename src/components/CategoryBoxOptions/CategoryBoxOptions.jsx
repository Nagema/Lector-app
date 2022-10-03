import React, { useContext } from 'react'
import "./styles.css";
import { News } from '../../context/newsContext'
import { Link } from "react-router-dom";

export const CategoryBoxOptions = () => {

  const { news } = useContext(News);

  const categorySet = new Set(news.map((item) => item.category));
  const categories = Array.from(categorySet);
  console.log(categories);
  

  // console.log(categoryList)
  return (
      <ul className='categoty_options__wrapper'>
      {categories.map((category) =>  
        <li> 
          <Link to={`/news/${category}`} >
            {category}
          </Link>
        </li>
      )}
      </ul>
  )
}
