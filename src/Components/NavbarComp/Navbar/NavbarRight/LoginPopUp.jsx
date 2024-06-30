/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, isLogin } from "../../../../Store/UserSlice";
import Register from "./Register";

function LoginPopUp({ onClose }) {
  const popupRef = useRef();
  const [registerForm, setRegisterForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userIsLogin.user);
  const handleClosePopup = (e) => {
    if (popupRef.current == e.target) {
      onClose();
    }
  };

  const handleLogin = () => {
    const mockUsernameLogin = user?.username?.toLowerCase().trim();
    const mockPasswordLogin = user?.password?.toLowerCase().trim();

    const usernameLogin = username.toLowerCase().trim();
    const passwordLogin = password.toLowerCase().trim();

    if (
      usernameLogin === mockUsernameLogin &&
      passwordLogin === mockPasswordLogin
    ) {
      localStorage.setItem("username", user.firstName);
      dispatch(isLogin());
      alert("Login Success");
      onClose();
    } else {
      alert("Login failure");
    }
  };

  const registerClick = () => {
    setRegisterForm(!registerForm);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div
      ref={popupRef}
      onClick={handleClosePopup}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
    >
      <div className="flex flex-col p-8 bg-white  rounded-md shadow w-full max-w-md">
        <button className="place-self-end" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
        {registerForm ? (
          <Register onRegisterClose={registerClick} />
        ) : (
          <div className="flex flex-col justify-center gap-5">
            {/* login is null */}

            <h2 className="text-2xl place-self-center font-semibold">Login</h2>
            <form action="#" className="flex flex-col gap-2">
              {/* username */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  fill="currentColor"
                  className="absolute top-2 left-2 bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <input
                  type="text"
                  name="username"
                  placeholder="Your username here..."
                  className=" w-full border border-black px-8 py-2 rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* password */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  fill="currentColor"
                  className="absolute top-2 left-2 bi bi-file-lock2-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 6a1 1 0 0 1 2 0v1H7z" />
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0" />
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password here..."
                  className="w-full border border-black px-8 py-2 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* button submit */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-2"
                onClick={handleLogin}
              >
                Submit
              </button>
            </form>
            <p className="text-center">
              No Account?{" "}
              <button className="text-blue-500" onClick={registerClick}>
                Register
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPopUp;
