import React, { createContext, useState } from "react";
import useFetch from "../utilsHooks/useFetch";

export const News = createContext();

const NewsProvider = ({ children }) => {
  const { news, loading } = useFetch();
  const [favs, setFavs] = useState([]);

  const isItFav = (item) => {
    return favs.some((element) => element.link === item.link);
  };

  const toggleFav = (item) => {
    const sameItem = isItFav(item);
    if (!sameItem) {
      setFavs([...favs, item]);
    } else {
      const newFavs = favs.filter((fav) => fav.link !== item.link);
      setFavs(newFavs);
    }
  };

  return (
    <News.Provider
      value={{
        news,
        loading,
        toggleFav,
        isItFav,
        favs,
      }}
    >
      {children}
    </News.Provider>
  );
};

export default NewsProvider;
