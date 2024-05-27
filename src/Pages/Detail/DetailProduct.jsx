import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL_PRODUCTS } from "../../Utils/BaseUrl";
import { Rating } from "@mui/material";
import { calDiscountPercentage } from "../../Utils/Other";
import Review from "../../Components/Review/Review";
import ImageDetailProduct from "./ImageDetailProduct";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, uniqWith } from "lodash";
import LoginPopUp from "../../Components/NavbarComp/Navbar/NavbarRight/LoginPopUp";
import { addCartProduct, addWishlistProduct } from "../../Store/ProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import CartModel from "../../Components/NavbarComp/Navbar/NavbarRight/CartModel";

function DetailProduct() {
  const [isPopup, setIsPopup] = useState(false);
  const [popupCart, setPopupCart] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  let [detailProduct, setDetailProduct] = useState([]);
  let [isSimilarProduct, setIsSimilarProduct] = useState([]);
  const cart = useSelector((state) => state.products.cart);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userIsLogin.login);

  const callData = async () => {
    const response = await axios.get(`${BASE_URL_PRODUCTS}/${id}`);
    const responseData = response.data;
    if (responseData) {
      return setDetailProduct({
        ...responseData,
      });
    }
  };

  const callDataSimilar = async (category) => {
    const response = await axios.get(
      `${BASE_URL_PRODUCTS}/category/${category}?limit=5`
    );
    const responseData = response.data.products;
    if (responseData) {
      return setIsSimilarProduct([...responseData]);
    }
  };

  const handleClickAddCart = () => {
    if (isLogin) {
      let productInCart = [];
      if (localStorage.getItem("cart")) {
        productInCart = JSON.parse(localStorage.getItem("cart"));
      }
      if (detailProduct != []) {
        productInCart.push({
          ...detailProduct,
          count: 1,
        });
        let unique = uniqWith(productInCart, isEqual);
        localStorage.setItem("cart", JSON.stringify(unique));
        dispatch(addCartProduct());
      }
    } else {
      setIsPopup(true);
    }
  };
  const handleBuyNow = () => {
    handleClickAddCart();
    if (isLogin) {
      setPopupCart(true);
    }
  };
  const totalPrice = () => {
    const initialValue = 0;
    return cart.reduce((currentValue, nextValue) => {
      return (
        currentValue +
        nextValue.count *
          calDiscountPercentage(nextValue.price, nextValue.discountPercentage)
      );
    }, initialValue);
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    dispatch(addCartProduct());
    setPopupCart(false);
    setIsCheckout(false);
    alert("your order has been confirmed");
  };

  const handleAddWishlist = () => {
    if (isLogin) {
      let productWish = [];
      if (localStorage.getItem("wishlist")) {
        productWish = JSON.parse(localStorage.getItem("wishlist"));
      }
      if (detailProduct != []) {
        productWish.push({
          ...detailProduct,
          wishlist: true,
        });
      }
      const unique = uniqWith(productWish, isEqual);
      localStorage.setItem("wishlist", JSON.stringify(unique));
      dispatch(addWishlistProduct());
      alert("Add Product in Wishlist");
    } else {
      setIsPopup(true);
    }
  };

  useEffect(() => {
    callDataSimilar(detailProduct.category);
  }, [detailProduct]);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      callData();
    }
  }, [id]);

  return (
    <div className="mx-auto  w-full h-full py-6">
      {/* Top Detail Page */}
      <div className="mx-4">
        <div className="grid md:grid-cols-6 gap-5">
          {/* left detail */}
          {detailProduct?.images ? (
            <ImageDetailProduct images={detailProduct.images} />
          ) : (
            <div>
              <img src={detailProduct.thumbnail} alt="product" />
            </div>
          )}

          {/* middle detail */}
          <div className="col-span-2 flex flex-col w-full">
            <div className="mb-5">
              {/* name */}
              <h1 className="text-2xl font-semibold mb-2">
                {detailProduct.title}
              </h1>
              {/* Rating */}
              {detailProduct.rating ? (
                <div className="flex items-center mb-2  text-gray-700 ">
                  <Rating
                    name="half-rating-read"
                    defaultValue={detailProduct?.rating}
                    precision={0.5}
                    className="mr-2"
                    size="small"
                    readOnly
                  />
                  {detailProduct.rating}
                </div>
              ) : null}

              {/* Pricing */}
              <div>
                <p className="text-xl text-blue-500 font-semibold">
                  $
                  {calDiscountPercentage(
                    detailProduct.price,
                    detailProduct.discountPercentage
                  )}
                </p>
                <div className="flex flex-row items-center gap-4">
                  <p className="line-through text-slate-500 text-sm">
                    ${detailProduct.price}
                  </p>
                  <p className="font-semibold">
                    -{detailProduct.discountPercentage}%
                  </p>
                </div>
              </div>
              {/* Brand Product */}
              <table className="my-2">
                <tbody>
                  <tr>
                    <td className="pr-2 font-bold">Brand:</td>
                    <td>{detailProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 font-bold">Category:</td>
                    <td>{detailProduct.category}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 font-bold">Stock:</td>
                    <td>{detailProduct.stock}</td>
                  </tr>
                </tbody>
              </table>
              {/* About the product */}
              <div>
                <h2 className="font-bold">About the product</h2>
                <p className="leading-5">{detailProduct.description}</p>
              </div>
            </div>
            {/* Footer middle */}
            <div>
              {/* Add Cart */}
              <button
                onClick={handleClickAddCart}
                className="mr-1 sm:mr-2 inline-flex items-center p-2  gap-1 text-xs sm:text-base font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-800 focus:ring-2 focus:outline-none "
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
              {/* Buy now */}
              <button
                onClick={handleBuyNow}
                className="mt-2 mr-1 sm:mr-2 inline-flex items-center p-2 gap-1 text-xs sm:text-base font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-cash-coin sm:h-6 h-5 "
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                  />
                  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                </svg>
                BUY NOW
              </button>

              {/* Add wishlist */}
              <button
                onClick={handleAddWishlist}
                className="mt-2 mr-1 sm:mr-2 inline-flex items-center p-2 gap-1 text-xs sm:text-base font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-heart sm:h-6 h-5 "
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                ADD WISH LIST
              </button>
            </div>
          </div>
          {/* right detail */}
          <div className="col-span-2 w-full">
            <Review />
          </div>
        </div>
      </div>

      {/* line */}
      <hr />

      {/* Below Detail Page */}
      <div className="mx-4">
        <div>
          <h1 className="text-4xl font-semibold font-lora my-5">
            Similar Products
          </h1>
          <div>
            {isSimilarProduct ? (
              <div className="grid  gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {isSimilarProduct?.map((item, idx) => {
                  if (item.id != id) {
                    return (
                      <ProductCard
                        key={idx}
                        products={item}
                        id={item.id}
                        name={item.title}
                        images={item.thumbnail}
                        category={item.category}
                        rating={item.rating}
                        pricing={item.price}
                        discountPercentage={item.discountPercentage}
                      />
                    );
                  }
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {isPopup && <LoginPopUp onClose={() => setIsPopup(false)} />}
      {/* Cart Popup */}
      {popupCart && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-[90]">
          {isCheckout ? (
            <div className="bg-white  sm:w-full max-w-sm p-5">
              <h1 className="text-2xl font-bold mb-2">Checkout</h1>
              <p className="leading-5 mb-8">
                Welcome to the checkout section. This is being a development
                project, I haven&apos;t implemented any payment related task. If
                you click the cancel button you&apos;ll go back to the cart
                segment. Clicking confirm button will consider your order
                confirmed, payment done & also order delivered successfully.
                Another thing to mention, order history hasn&apos;t been
                developed due to not having a proper backend api.
              </p>
              <div className="flex justify-between">
                <button
                  className="border border-black py-1 px-14 rounded-md"
                  onClick={() => setIsCheckout(false)}
                >
                  Cancel
                </button>
                <button
                  className="border border-black py-1 px-14 rounded-md"
                  onClick={handleCheckout}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white  sm:w-full max-w-sm p-5 overflow-y-scroll">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-2xl font-bold ">Your Cart</h3>
                <button onClick={() => setPopupCart(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </div>
              {/* for add Product in Cart */}
              {cart.length > 0 && isLogin ? (
                <div className="mt-5">
                  {cart.map((item, idx) => {
                    return (
                      <CartModel
                        key={idx}
                        id={item.id}
                        name={item.title}
                        stock={item.stock}
                        count={item.count}
                        image={item.images}
                        price={item.price}
                        discountPercentage={item.discountPercentage}
                      />
                    );
                  })}
                  <div>
                    <div className="px-2 flex justify-between flex-row">
                      <p className="text-2xl font-semibold">Total</p>
                      <p className="text-2xl font-semibold">${totalPrice()}</p>
                    </div>
                    <button
                      onClick={() => setIsCheckout(true)}
                      className="w-full hover:opacity-70 bg-blue-500 text-white rounded-md p-2 text-xl font-semibold mt-5"
                    >
                      CHECKOUT
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-2xl">Your cart is empty</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
