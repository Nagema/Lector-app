import React, { createContext, useState } from "react";
import useFetch from "../utilsHooks/useFetch";

export const News = createContext();

const NewsProvider = ({ children }) => {
  const { news, loading } = useFetch();
  const [favIds, setFavIds] = useState([]);

  const getIsFav = (item) => {
    return favIds.includes(item.id);
  };

  const toggleFav = (item) => {
    if (getIsFav(item)) {
      const newFavIds = favIds.filter((favId) => favId !== item.id); // remove fav
      setFavIds(newFavIds);
    } else {
      setFavIds([...favIds, item.id]); // add fav
    }
  };

  return (
    <News.Provider
      value={{
        news,
        loading,
        toggleFav,
        getIsFav,
        favIds,
      }}
    >
      {children}
    </News.Provider>
  );
};

export default NewsProvider;
