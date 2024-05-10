import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, isLogout } from "../../../../Store/UserSlice";
import { Link } from "react-router-dom";

function UserNav() {
  const dispatch = useDispatch();
  const [onShow, setOnShow] = useState(false);

  const user = useSelector((state) => state.userIsLogin.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  

  return (
    <div className="relative " onClick={() => setOnShow(!onShow)}>
      <div className="flex items-center gap-2 cursor-pointer ">
        <img src={user.imageAccount} alt="logo" className="h-6 rounded-full" />
        <div>
          <p className="text-2xl text-gray-500">
            {user.username}
          </p>
        </div>
      </div>
      {onShow ? (
        <div className="absolute border-2 shadow-lg px-6 py-3 bg-white left-[-25px] top-10 ">
          <ul className="">
            <li className="flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                className="bi bi-person-circle h-5 "
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <Link
                to={"/account"}
                className="text-lg text-gray-500 hover:underline "
              >
                Account
              </Link>
            </li>
            <li className="flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                className="bi bi-heart h-5"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
              <Link
                to={"/wishlist"}
                className="text-lg text-gray-500 hover:underline"
              >
                Wishlist
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                className="bi bi-box-arrow-right h-5"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              <a
                href="#"
                onClick={() => dispatch(isLogout())}
                className="text-lg text-gray-500 hover:underline"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default UserNav;
