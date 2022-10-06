import React from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const CardComponent = ({ article, onCardClick, isFav, onFavClick }) => {
  const favClassName = `${isFav ? "card_favorite_icon--selected" : ""}`;

  return (
    <li className="card">
      <div className="card_header">
        <div className="card_badges">
          <p>{article.category}</p>
          <p>votos: {article.votes}</p>
        </div>
        <button
          type="button"
          className={"card_favorite_icon " + favClassName}
          onClick={() => onFavClick(article)}
        >
          <FontAwesomeIcon className="fa-xl" icon={faHeart} />
        </button>
      </div>
      <div
        className="card_body"
        data-testid="card-body"
        onClick={() => onCardClick(`/detail/${article.id}`)}
      >
        <div className="card_main_info">
          <h2 className="card_title">{article.title}</h2>
          {article.image && (
            <img className="card_image" src={article.image} alt="news" />
          )}
        </div>
        <div className="card_options">
          <div className="card_description">
            <div
              className="card_description_content"
              dangerouslySetInnerHTML={{ __html: article.description }}
            ></div>
          </div>
          <p className="card_date">Publicado: {article.pubDate}</p>
        </div>
      </div>
    </li>
  );
};
