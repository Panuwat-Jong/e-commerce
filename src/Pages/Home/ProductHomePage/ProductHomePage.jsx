import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Store/ProductSlice";
import { Link } from "react-router-dom";
import ProductCard from "../../../Components/ProductCard/ProductCard";
function ProductHomePage() {
  const products = useSelector((state) => state.products.item);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="mx-auto  w-full py-6">
      <div className="mx-4">
        <div className="flex-col justify-center items-center">
          <h1 className="font-lora font-bold text-3xl md:text-4xl lg:text-5xl mb-5">
            Trending Products
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
            {products?.products?.map((item) => {
              if (item.id <= 8) {
                return (
                  <ProductCard
                    key={item.id}
                    products={item}
                    images={item.images}
                    name={item.title}
                    category={item.category}
                    rating={item.rating}
                    pricing={item.price}
                    discountPercentage={item.discountPercentage}
                  />
                );
              }
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 py-6 md:py-12 w-full">
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/026/184/613/non_2x/cyber-monday-colorful-neon-style-super-sale-web-banner-cyber-monday-sale-special-offer-social-media-post-design-business-promotion-and-advertising-template-seasonal-offers-mega-big-sale-vector.jpg"
              }
              alt="special offer"
            />
            <div className="bg-slate-200 flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-lora font-semibold my-2">
                Don&apos;t miss the offer{" "}
                <p className="text-xl sm:text-2xl md:text-3xl font-lora font-semibold">
                  Grab it now
                </p>
              </h2>
              <Link
                to={""}
                className="max-md:mb-2 font-lora font-medium bg-white rounded-md px-6 py-3 hover:bg-blue-500 hover:text-white"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <h2 className="text-4xl font-bold font-lora mb-3">New Arrivals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
            {products?.products?.map((item) => {
              if (item.id > 8) {
                return (
                  <ProductCard
                    key={item.id}
                    products={item}
                    images={item.images}
                    name={item.title}
                    category={item.category}
                    rating={item.rating}
                    pricing={item.price}
                    discountPercentage={item.discountPercentage}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHomePage;
