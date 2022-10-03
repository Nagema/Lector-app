import "./App.css";
import { MainPage } from "./containers/MainContainer/MainPage";
import { NavBar } from "./containers/NavBarContainer/NavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<MainPage/> }></Route>      
        </Routes>
        {/* <MainPage /> */}
      </BrowserRouter>
    </div>
  );
}
export default App;
