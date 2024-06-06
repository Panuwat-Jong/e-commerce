import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="mx-auto w-full py-12 bg-gradient-to-t md:bg-gradient-to-r from-blue-300 to-white ">
      <div className="mx-4 md:mx-8 lg:mx-20 xl:mx-40 h-fit sm:items-center grid grid-cols-1  md:grid-cols-2  md:gap-5">
        <div className="w-full  md:max-w-md space-y-2 md:space-y-4 order-2 md:order-1 max-md:text-center">
          <p className="font-lora font-semibold">Starting At $999</p>
          <h1 className="font-lora font-bold text-3xl md:text-4xl lg:text-5xl ">
            The best notebook collection 2024
          </h1>
          <p className="font-lora font-semibold text-xl lg:text-2xl">
            Exclusive offer <span className="text-red-500"> -10% </span> off
            this week
          </p>
          <div>
            <Link
              to={`/products/${78}`}
              className=" font-lora font-medium bg-white rounded-md px-6 py-3 hover:bg-blue-500 hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 place-self-center h-full  md:max-h-96  ">
          <img
            src={"https://pngimg.com/d/laptop_PNG101816.png"}
            alt="notebook"
            className=" md:h-full "
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
