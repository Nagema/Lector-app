import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardDetail } from "../../components/CardDetail/CardDetail";
import { News } from "../../context/NewsContext";
import "./styles.css";

export const MainCardDetail = () => {
  const { id } = useParams();
  const { news } = useContext(News);
  return (
    <div>
      {news
        .filter(
          (newItem) => newItem.id === id
        )
        .map((newItem) => (
          <div className="main_detail_container" key={newItem.link}>
            <CardDetail newItem={newItem} />
          </div>
        ))}
    </div>
  );
};
