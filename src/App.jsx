import "./App.css";
import { MainPage } from "./containers/MainContainer/MainPage";
import { NavBar } from "./containers/NavBarContainer/NavBar";
import { Favorites } from "./containers/Favorites/Favorites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNewsProvider from "./context/NewsContext";
import SearchProvider from "./context/SearchContext";

function App() {
  return (
    <>
      <SearchProvider>
        <MyNewsProvider>
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
        </MyNewsProvider>
      </SearchProvider>
    </>
  );
}
export default App;
