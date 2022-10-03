import React, { useEffect, useState } from "react";
import "./styles.css";
import xml2js from "xml2js";
import { CardComponent } from "../../components/CardComponent/CardComponent";

export const MainPage = () => {
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
      // console.log(channel.item)
      const rssNews = channel.item.map((item) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        description: item.description[0],
        categories: item.category,
        image: item["media:thumbnail"]?.[0].$.url,
      }));
      setNews(
        rssNews
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews)
          .concat(rssNews)
      ); // TODO: renove this
      // console.log(rssNews)
    }
    fetchNews();
  }, []);

  return (
    <div>
      <main>
        <section>
          <ul className="main_news_list">
            {news.map((newItem, index) => (
              <CardComponent key={index} newItem={newItem} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};
