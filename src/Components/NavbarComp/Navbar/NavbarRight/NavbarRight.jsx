import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "./UserNav";
import { isLogin } from "../../../../Store/UserSlice";

function NavbarRight() {
  const [isPopup, setIsPopUp] = useState(false);
  // const [isLogin, setIsLogin] = useState(login);
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
        <Link to={"/categories"} className="text-xl font-semibold">
          Products
        </Link>
      </div>
      {/* Account Login */}
      {login ? (
        <UserNav />
      ) : (
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setIsPopUp(true)}
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

      {isPopup && <LoginPopUp onClose={() => setIsPopUp(false)} />}

      {/* Shopping Basket */}
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          className="bi bi-cart3"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </button>
    </div>
  );
}

export default NavbarRight;
