import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartModel from "./CartModel";
import { calDiscountPercentage } from "../../../../Utils/Other";
import { addCartProduct } from "../../../../Store/ProductSlice";
function Cart() {
  const isLogin = useSelector((state) => state.userIsLogin.login);
  const [popupCart, setPopupCart] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

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

  return (
    <div>
      {popupCart ? (
        <div className=" fixed inset-0 bg-black bg-opacity-30 flex justify-end transition-all ease-in-out duration-300 ">
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
      ) : (
        <div
          className="relative transition-all ease-in-out duration-100 cursor-pointer hover:opacity-70"
          onClick={() => setPopupCart(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            fill="grey"
            className="bi bi-cart3 "
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <p className="absolute right-[-8px] top-[-12px] bg-red-500 text-center text-white rounded-full w-6">
            {isLogin ? cart.length : 0}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
