import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Store/UserSlice";
import HomePage from "../Home/HomePage";
import { addCartProduct } from "../../Store/ProductSlice";

function AccountUser() {
  const isLogin = useSelector((state) => state.userIsLogin.login);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userIsLogin.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addCartProduct());
  }, [dispatch]);


  return (
    <div>
      {isLogin ? (
        <div className="w-full max-w-6xl m-auto mt-5 mb-16 md:mb-28">
          <div className="mx-4">
            <h1 className="text-4xl font-lora font-bold mb-12">Your Account</h1>
            <div className="flex flex-col lg:flex-row max-lg:text-center items-start gap-5 sm:mx-10 md:mx-20">
              <div className="max-lg:self-center">
                <img
                  src={user.imageAccount}
                  alt={"imageUser"}
                  className="w-56 sm:w-[300px] h-56 sm:h-[300px] "
                />
              </div>
              <ul className=" space-y-2">
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold "> Username: </span>
                    {user.username}
                  </p>
                </li>
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold"> First Name: </span>
                    {user.firstName}
                  </p>
                </li>
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold"> Last Name: </span>
                    {user.lastName}
                  </p>
                </li>
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold"> Age: </span>
                    {user.age}
                  </p>
                </li>
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold"> Address: </span>
                    {user.address}
                  </p>
                </li>
                <li>
                  <p className="text-lg sm:text-xl">
                    <span className="font-semibold"> Company: </span>
                    {user.company}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default AccountUser;
