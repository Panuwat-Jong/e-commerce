import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Categories from "./Pages/Categories/Categories";
import DetailProduct from "./Pages/Detail/DetailProduct";
import Navbar from "./Components/NavbarComp/Navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/:name" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
