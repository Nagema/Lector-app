import "./App.css";
import { MainPage } from "./containers/MainContainer/MainPage";
import { NavBar } from "./containers/NavBarContainer/NavBar";
import { Favorites } from "./containers/Favorites/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchProvider from "./context/SearchContext";
import NewsProvider from "./context/NewsContext";

function App() {
  return (
    <>
      <SearchProvider>
        <NewsProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/news/:category" element={<MainPage />}></Route>
              <Route
                path="/favorites"
                element={<Favorites></Favorites>}
              ></Route>
            </Routes>
          </BrowserRouter>
        </NewsProvider>
      </SearchProvider>
    </>
  );
}
export default App;
