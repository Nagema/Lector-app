import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { News } from "../../context/NewsContext";
import { useParams } from "react-router-dom";
import { Search } from "../../context/SearchContext";

export const MainPage = () => {
  const { category } = useParams();
  const { news } = useContext(News);
  const { searchInput } = useContext(Search);

  const [fileteredNews, setFilteredNews] = useState([]);
  useEffect(() => {
    const fileteredNews = news
      .filter((item) => {
        if (!category) return true;
        return item.category === category;
      })
      .filter((item) => {
        if (!searchInput) return true;
        return item.title.toLowerCase().includes(searchInput.toLowerCase());
      });
    setFilteredNews(fileteredNews);
  }, [category, news, searchInput]);

  return (
    <div>
      <main>
        <section>
          <ul className="main_news_list">
            {fileteredNews.map((newItem, index) => (
              <CardComponent key={index} newItem={newItem} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};
