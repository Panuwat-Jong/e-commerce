import React from "react";
function Header() {
  return (
    <div className="mx-auto w-full py-12 bg-gradient-to-r from-blue-300 to-white">
      <div className="mx-4 md:mx-8 lg:mx-40 h-fit sm:items-center grid grid-cols-1 md:gap-5 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="w-full  md:max-w-md lg:col-span-2 space-y-4 order-2 md:order-1 ">
          <p className="font-lora font-semibold">Starting At $999</p>
          <h1 className="font-lora font-bold text-3xl md:text-4xl lg:text-5xl">
            The best notebook collection 2024
          </h1>
          <p className="font-lora font-semibold text-xl lg:text-2xl">
            Exclusive offer <span className="text-red-500"> -10% </span> off
            this week
          </p>
          <button className="font-lora font-medium bg-white rounded-md px-6 py-3 hover:bg-blue-500 hover:text-white">
            Shop Now
          </button>
        </div>
        <div className="order-1 md:order-2 place-self-center col-span-1 h-full max-h-96">
          <img
            src={
              "https://http2.mlstatic.com/D_NQ_NP_827903-MLU71420229448_092023-O.webp"
            }
            alt="notebook"
            className="h-full mix-blend-multiply "
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
