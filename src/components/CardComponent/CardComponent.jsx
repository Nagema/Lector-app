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
    isItFav(newItem) ? "card_favorite_icon" : "not_favorite"
  }`;

  return (
    <li className="card" >
      <div onClick={handleDetail}>
          <div className="card_main_info">
            <h4 className="card_title">{newItem.title}</h4>
            {newItem.image && (
              <div className="card_image">
                <img src={newItem.image} alt="news" />
              </div>
            )}
          </div>
          <div className="card_options">
            <div className="card_description">
                <div className="card_description_content"  dangerouslySetInnerHTML={{ __html: newItem.description }}></div>
            </div>
            <p className="card_date">Publicado: {newItem.pubDate}</p>
            <div className="card_badges">
              <p>votos: {newItem.votes}</p>
              <p>{newItem.category}</p>
            </div>
        </div>
      </div>
        <button
          type="button"
          className={favClassName}
          onClick={() => toggleFav(newItem)}
          >
          <FontAwesomeIcon className="fa-xl" icon={faHeart} />
        </button>
    </li>
  );
};
