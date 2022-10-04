import React from "react";
import "./styles.css";

export const CardDetail = (newItem) => {
  return (
    <div className="card">
      <div>
        <h1 className="card_title">{newItem.newItem.title}</h1>
        {newItem.newItem.image && (
          <div className="card_image">
            <img src={newItem.newItem.image} alt="news" />
          </div>
        )}
        <div
          className="card_description"
          dangerouslySetInnerHTML={{ __html: newItem.newItem.description }}
        ></div>
        <p className="card_date">Publicado: {newItem.newItem.pubDate}</p>
      </div>
      <div className="card_options">
        <div className="card_badges">
          <p>votos: {newItem.newItem.votes}</p>
          <p>{newItem.newItem.category}</p>
        </div>
      </div>
    </div>
  );
};
