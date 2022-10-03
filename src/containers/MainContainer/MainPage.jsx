import React, { useContext } from "react";
import "./styles.css";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { News } from "../../context/newsContext";
import { useParams } from "react-router-dom";

export const MainPage = () => {
  const { category } = useParams();
  const { news } = useContext(News);

  const fileteredNews = news.filter((item) => {
    if (!category) return true;
    return item.category === category;
  });

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
