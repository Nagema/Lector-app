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
        <div className="card_image">
          <img src={newItem.image} alt="logo" />
        </div>
        <p className="card_description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta alias
          nemo culpa consequuntur quia tempore dolorem maiores rerum quaerat sed
          dolorum delectus sit tempora, ipsam, beatae, repellendus vel magni
          odit!
        </p>
        <p className="card_date">Publish Date: {newItem.pubDate}</p>
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
