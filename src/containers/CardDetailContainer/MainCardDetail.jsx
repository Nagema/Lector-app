import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardDetail } from "../../components/CardDetail/CardDetail";
import { News } from "../../context/NewsContext";

export const MainCardDetail = () => {
  const { id } = useParams();
  const { news } = useContext(News);
  return (
    <div>
      {" "}
      {news
        .filter(
          (newItem) => newItem.title.replaceAll(" ", "-").toLowerCase() === id
        )
        .map((newItem) => (
          <div key={newItem.link}>
            <CardDetail newItem={newItem} />
          </div>
        ))}
    </div>
  );
};
