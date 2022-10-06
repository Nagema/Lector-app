import React, { useContext } from "react";
import "./styles.css";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { News } from "../../context/NewsContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Search } from "../../context/SearchContext";

export const MainPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { pathname } = useLocation();
  const { news, getIsFav, toggleFav, favIds, loading } = useContext(News);
  const { searchInput } = useContext(Search);

  const isFavoritePage = pathname === "/favorites";

  const fileteredNews = news
    .filter((item) => {
      // filter by category
      if (!category) return true;
      return item.category === category;
    })
    .filter((item) => {
      // filter by search term
      if (!searchInput) return true;
      return item.title.toLowerCase().includes(searchInput.toLowerCase());
    })
    .filter((item) => {
      // filter by favorite
      if (!isFavoritePage) return true;
      return getIsFav(item);
    });

  const onCardClick = (route) => {
    navigate(route);
  };

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
                  <CardComponent
                    key={index}
                    article={newItem}
                    onCardClick={onCardClick}
                    isFav={getIsFav(newItem)}
                    onFavClick={toggleFav}
                  />
                ))
              ) : (
                <li className="no_results">
                  {isFavoritePage && !favIds.length
                    ? "Oops! Parece que no tienes favoritos"
                    : "Oops! No se encuentran resultados para esta búsqueda"}
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
