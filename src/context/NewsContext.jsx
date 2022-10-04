import React, { createContext, useState } from "react";
import useFetch from "../utilsHooks/useFetch";

export const News = createContext();

const NewsProvider = ({ children }) => {
  const { news, loading } = useFetch();
  const [favIds, setFavIds] = useState([]);

  const isItFav = (item) => {
    return favIds.includes(item.id);
  };

  const toggleFav = (item) => {
    if (isItFav(item)) {
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
        isItFav,
        favIds,
      }}
    >
      {children}
    </News.Provider>
  );
};

export default NewsProvider;
