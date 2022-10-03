import { useState, useEffect } from "react";
import xml2js from "xml2js";

const useFetch = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      // fetch rss data in xml format
      const response = await fetch("/rss");
      const xmlText = await response.text();
      // transform xml to json
      const parsedRss = await new Promise((resolve, reject) => {
        xml2js.parseString(xmlText, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      const [channel] = parsedRss.rss.channel;
      // map rss json to our own structure
    //   console.log(channel);
      const rssNews = channel.item.map((item) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        description: item.description[0],
        image: item["media:thumbnail"]?.[0].$.url,
        category: item["meneame:sub"]?.[0],
        votes: item["meneame:votes"],
      }));
      
      setNews(
        rssNews
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews),
      ); // TODO: renove this
      //
      
    //   console.log(rssNews)
    }
    fetchNews();
  }, []);

  return {
    news,
  };
};

export default useFetch;
