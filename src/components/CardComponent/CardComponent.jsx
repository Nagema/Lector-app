import React, { useContext } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { News } from "../../context/NewsContext";

export const CardComponent = ({ newItem }) => {
  const { toggleFav, isItFav } = useContext(News);

  const favClassName = `${
    isItFav(newItem) ? "card_favorite_icon" : "not_favorite"
  }`;

  return (
    <li className="card">
      <div>
        <h1 className="card_title">{newItem.title}</h1>
        {newItem.image && (
          <div className="card_image">
            <img src={newItem.image} alt="news" />
          </div>
        )}
        <div
          className="card_description"
          dangerouslySetInnerHTML={{ __html: newItem.description }}
        ></div>
        <p className="card_date">Publicado: {newItem.pubDate}</p>
      </div>
      <div className="card_options">
        <div className="card_badges">
          <p>votos: {newItem.votes}</p>
          <p>{newItem.category}</p>
        </div>
        <button
          type="button"
          className={favClassName}
          onClick={() => toggleFav(newItem)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </li>
  );
};
