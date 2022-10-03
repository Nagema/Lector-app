import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const CardComponent = ({ newItem }) => {

  return (
    <li className="card">
      <div>
        <h1 className="card_title">{newItem.title}</h1>
        { newItem.image && 
          <div className="card_image">
            <img src={newItem.image} alt="news image" />
          </div>
        }
        <div className="card_description" dangerouslySetInnerHTML={{__html: newItem.description}}>
        </div>
        <p className="card_date">Publicado: {newItem.pubDate}</p>
      </div>
      <div className="card_options">
          <div className="card_badges">
            <p>votos: {newItem.votes}</p>
            <p>{newItem.category}</p>
          </div>
          <button type="button" className="card_favorite_icon">
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
    </li>
  );
};
