/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "./UserNav";
import { isLogin } from "../../../../Store/UserSlice";
import Cart from "./Cart";

function NavbarRight({ resPopup }) {
  const [isPopup, setIsPopup] = useState(false);
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
    <div className="flex gap-8 items-center flex-col md:flex-row  ">
      {/* categories */}
      <div>
        <Link
          to={"/categories"}
          className="text-xl font-bold "
          onClick={resPopup}
        >
          Products
        </Link>
      </div>
      {/* Account Login */}
      {login ? (
        // Login is true
        <UserNav resPopup={resPopup} />
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
      <div className="hidden md:block ">
        <Cart />
      </div>
    </div>
  );
}

export default NavbarRight;
