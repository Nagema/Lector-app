import React, { useContext } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { News } from "../../context/NewsContext";
import { useNavigate } from "react-router-dom";

export const CardComponent = ({ newItem }) => {
  const { toggleFav, isItFav } = useContext(News);

  const navigate = useNavigate();
  const handleDetail = () => {
    const id = newItem.title.replaceAll(" ", "-").toLowerCase();
    navigate(`/detail/${id}`);
  };

  const favClassName = `${
    isItFav(newItem) ? "card_favorite_icon--selected" : ""
  }`;

  return (
    <li className="card">
      <div onClick={handleDetail}>
        <div className="card_header">
          <div className="card_badges">
            <p>{newItem.category}</p>
            <p>votos: {newItem.votes}</p>
          </div>
          <button
            type="button"
            className={"card_favorite_icon " + favClassName}
            onClick={(event) => {
              event.stopPropagation();
              toggleFav(newItem);
            }}
          >
            <FontAwesomeIcon className="fa-xl" icon={faHeart} />
          </button>
        </div>
        <div className="card_body">
          <div className="card_main_info">
            <h4 className="card_title">{newItem.title}</h4>
            {newItem.image && (
              <img className="card_image" src={newItem.image} alt="news" />
            )}
          </div>
          <div className="card_options">
            <div className="card_description">
              <div
                className="card_description_content"
                dangerouslySetInnerHTML={{ __html: newItem.description }}
              ></div>
            </div>
            <p className="card_date">Publicado: {newItem.pubDate}</p>
          </div>
        </div>
      </div>
    </li>
  );
};
