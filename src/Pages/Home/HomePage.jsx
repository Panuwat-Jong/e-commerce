import { useEffect } from "react";
import Header from "./Header/Header";
import Benefit from "./Benefit";
import ProductHomePage from "./ProductHomePage/ProductHomePage";

function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <Benefit />
      <ProductHomePage />
    </div>
  );
}

export default HomePage;
