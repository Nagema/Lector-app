import "./App.css";
import { MainPage } from "./containers/MainContainer/MainPage";
import { NavBar } from "./containers/NavBarContainer/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsProvider from "./context/NewsContext";
import { SearchProvider } from "./context/SearchContext";

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
            </Routes>
          </BrowserRouter>
        </NewsProvider>
      </SearchProvider>
    </>
  );
}
export default App;
