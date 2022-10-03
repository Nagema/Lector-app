import "./App.css";
import { MainPage } from "./containers/MainContainer/MainPage";
import { NavBar } from "./containers/NavBarContainer/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewsProvider from "./context/newsContext";

function App() {
  return (
    <div>
      <NewsProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<MainPage/> }></Route>
            <Route path='/news/:category' element={<MainPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </NewsProvider>
    </div>
  );
}
export default App;
