import { useState, useEffect } from "react";

const useFetch = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      // fetch rss data in json format from the server
      const response = await fetch("/news");
      const rssNews = await response.json();
      setNews(rssNews);
      setLoading(false);
    }
    fetchNews();
  }, []);

  return {
    news,
    loading,
  };
};

export default useFetch;
