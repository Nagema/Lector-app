import React from "react";
import "./styles.css";

export const CardDetail = (newItem) => {
  return (
    <div>
      <div className="card_detail">
        <h3>{newItem.newItem.title}</h3>
        {newItem.newItem.image && (
          <div className="card_detail_image">
            <img src={newItem.newItem.image} alt="news" />
          </div>
        )}
        <div
          className="card_description__detail"
          dangerouslySetInnerHTML={{ __html: newItem.newItem.description }}
        ></div>
        <p className="card_date">Publicado: {newItem.newItem.pubDate}</p>
      </div>
      <div>
      </div>
    </div>
  );
};
