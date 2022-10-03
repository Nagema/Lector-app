import { useState, useEffect } from "react";

const useFetch = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      // fetch rss data in json format from the server
      const response = await fetch("/news");
      const rssNews = await response.json();
      setNews(rssNews); 
    }
    fetchNews();
  }, []);

  return {
    news,
  };
};

export default useFetch;