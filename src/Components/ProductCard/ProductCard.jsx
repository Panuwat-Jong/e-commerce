import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LoginPopUp from "../NavbarComp/Navbar/NavbarRight/LoginPopUp";
import { isEqual, uniqWith } from "lodash";
import { addCartProduct } from "../../Store/ProductSlice";
import { useEffect } from "react";
import { calDiscountPercentage } from "../../Utils/Other";
import PropTypes from "prop-types";

function ProductCard({
  products,
  id,
  name,
  images,
  category,
  rating,
  pricing,
  discountPercentage,
}) {
  const [isPopup, setIsPopup] = useState(false);
  const isLogin = useSelector((state) => state.userIsLogin.login);
  const dispatch = useDispatch();

  const handleClickAddCart = () => {
    if (isLogin) {
      let productInCart = [];
      if (localStorage.getItem("cart")) {
        productInCart = JSON.parse(localStorage.getItem("cart"));
      }
      productInCart.push({
        ...products,
        count: 1,
      });
      let unique = uniqWith(productInCart, isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch(addCartProduct());
    } else {
      setIsPopup(true);
    }
  };

  useEffect(() => {
    dispatch(addCartProduct());
  }, [dispatch]);

  return (
    <div className="h-full  w-full">
      <div className="max-w-sm w-full bg-white border border-gray-200 hover:rounded-lg hover:shadow-xl ">
        <Link to={`/products/${id}`}>
          <img
            className="rounded-t-lg w-full h-52 object-contain "
            src={images}
            alt={name}
          />
        </Link>
        <div className="p-5  border-t-[1px] hover:opacity-85 flex-col ">
          <p className="text-sm text-gray-400">{category}</p>
          <a
            href={`/products/${id}`}
            className=" text-base font-bold tracking-tight text-gray-900 hover:underline"
          >
            {name}
          </a>

          {/* rating */}
          <div className="flex items-center mb-2  text-gray-700 ">
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              className="mr-2"
              size="small"
              readOnly
            />
            {rating}
          </div>
          {/* footer card */}
          <div className="flex justify-between">
            {/* pricing */}
            <div>
              <h5 className="text-2xl font-semibold text-blue-500 ">{`$${calDiscountPercentage(
                pricing,
                discountPercentage
              )}`}</h5>
              <div className="flex items-center">
                <p className="font-normal text-gray-400 line-through">
                  {`$${pricing}`}
                </p>
                <p className="ml-2 text-lg text-red-500">{`-${discountPercentage}%`}</p>
              </div>
            </div>
            {/* button add cart */}
            <button
              onClick={handleClickAddCart}
              className="max-sm:ml-2 md:ml-4 inline-flex items-center px-1 sm:px-3 gap-1 text-xs sm:text-base font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-800 focus:ring-2 focus:outline-none focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                className="bi bi-cart3 sm:h-6 h-5 "
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {isPopup && <LoginPopUp onClose={() => setIsPopup(false)} />}
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  category: PropTypes.string,
  rating: PropTypes.number.isRequired,
  pricing: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number.isRequired,
};

export default ProductCard;
