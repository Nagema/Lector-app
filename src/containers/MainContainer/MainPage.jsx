import React, { useContext } from "react";
import "./styles.css";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { News } from "../../context/NewsContext";
import { useParams } from "react-router-dom";
import { Search } from "../../context/SearchContext";

export const MainPage = () => {
  const { category } = useParams();
  const { news, loading } = useContext(News);
  const { searchInput } = useContext(Search);

  const fileteredNews = news
    .filter((item) => {
      if (!category) return true;
      return item.category === category;
    })
    .filter((item) => {
      if (!searchInput) return true;
      return item.title.toLowerCase().includes(searchInput.toLowerCase());
    });

  return (
    <div>
      <main>
        <section>
          {loading ? (
            <div className="loader_wrapper">
              <span className="loader" />
            </div>
          ) : (
            <ul className="main_news_list">
              {fileteredNews.length ? (
                fileteredNews.map((newItem, index) => (
                  <CardComponent key={index} newItem={newItem} />
                ))
              ) : (
                <li className="no_results">
                  Oops! No se encuentran resultados para esta búsqueda
                  ¯\_(ツ)_/¯
                </li>
              )}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};
