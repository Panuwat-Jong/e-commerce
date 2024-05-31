import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import axios from "axios";
import { BASE_URL_PRODUCTS } from "../../../Utils/BaseUrl";

import PropTypes from "prop-types";

function ProductCategories({ categoriesList }) {
  let [productCategories, setProductCategories] = useState([]);
  const products = useSelector((state) => state.products.itemFull);
  const callDataCategory = async () => {
    const response = await axios(
      `${BASE_URL_PRODUCTS}/category/${categoriesList}`
    );
    const responseData = response.data?.products;
    setProductCategories(responseData);
  };

  useEffect(() => {
    callDataCategory();
  }, [categoriesList]);
  return (
    <div>
      <h2 className="mb-5">
        Categories List {">"}{" "}
        <span className="font-semibold text-blue-500">{categoriesList}</span>
      </h2>
      {categoriesList !== "all" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCategories?.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                category={item.categories}
                discountPercentage={item.discountPercentage}
                images={item.thumbnail}
                name={item.title}
                pricing={item.price}
                products={item}
                rating={item.rating}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.products?.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                category={item.categories}
                discountPercentage={item.discountPercentage}
                images={item.thumbnail}
                name={item.title}
                pricing={item.price}
                products={item}
                rating={item.rating}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

ProductCategories.propTypes = {
  categoriesList: PropTypes.string.isRequired,
};
export default ProductCategories;
