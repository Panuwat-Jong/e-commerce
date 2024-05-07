import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "./UserNav";
import { isLogin } from "../../../../Store/UserSlice";

function NavbarRight() {
  const [isPopup, setIsPopup] = useState(false);
  const [popupCart, setPopupCart] = useState(false);
  const login = useSelector((state) => state.userIsLogin.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storeIsLogin = localStorage.getItem("isLogin");

    if (storedUser && storeIsLogin) {
      dispatch(isLogin());
    }
  }, [dispatch]);

  return (
    <div className="flex gap-8 items-center">
      {/* categories */}
      <div>
        <Link to={"/categories"} className="text-xl font-bold">
          Products
        </Link>
      </div>
      {/* Account Login */}
      {login ? (
        // Login is true
        <UserNav />
      ) : (
        // is not Login
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setIsPopup(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <p className="text-2xl text-gray-500">Login</p>
        </div>
      )}
      {isPopup && <LoginPopUp onClose={() => setIsPopup(false)} />}

      {/* Shopping Basket */}
      {popupCart ? (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
          <div className="bg-white w-full max-w-sm p-5">
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
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-2xl">Your cart is empty</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative" onClick={() => setPopupCart(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            fill="grey"
            className="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <p className="absolute right-[-8px] top-[-12px] bg-red-500 text-center text-white rounded-full w-6">
            0
          </p>
        </div>
      )}
    </div>
  );
}

export default NavbarRight;
