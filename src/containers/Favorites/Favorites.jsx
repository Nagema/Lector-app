import React, { useContext } from "react";
import { News } from "../../context/NewsContext";
import { CardComponent } from "../../components/CardComponent/CardComponent";

export const Favorites = () => {
  const { favs } = useContext(News);
  console.log(favs);
  return (
    <section>
      <ul className="main_news_list">
        {favs.map((newItem, index) => (
          <CardComponent key={index} newItem={newItem} />
        ))}
      </ul>
    </section>
  );
};
