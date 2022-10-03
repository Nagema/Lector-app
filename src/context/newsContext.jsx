import React, { createContext } from "react";
import useFetch from "../utilsHooks/useFetch";

export const News = createContext();

export const NewsProvider = ({ children }) => {
  const { news, setNews } = useFetch({
    url: "/rss",
  });

  return (
    <News.Provider
      value={{
        news,
        setNews,
      }}
    >
      {children}
    </News.Provider>
  );
};

export default NewsProvider;
