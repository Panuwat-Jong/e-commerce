import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Categories from "./Pages/Categories/Categories";
import DetailProduct from "./Pages/Detail/DetailProduct";
import Navbar from "./Components/NavbarComp/Navbar/Navbar";
import AccountUser from "./Pages/Account/AccountUser";
import Wishlist from "./Pages/Wishlist/Wishlist";
import FooterPage from "./Components/Footer/FooterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<AccountUser />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<DetailProduct />} />
        </Routes>
        <FooterPage />
      </BrowserRouter>
    </>
  );
}

export default App;
