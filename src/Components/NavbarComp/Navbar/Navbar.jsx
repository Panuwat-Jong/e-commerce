import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import NavbarRight from "./NavbarRight/NavbarRight";
import { useEffect, useState } from "react";
import Cart from "./NavbarRight/Cart";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);



  return (
    <nav className=" sticky top-0 bg-white max-h-20 mx-auto w-full py-4 border-b shadow-md z-[50]">
      <div className="mx-4 flex justify-between items-center gap-8 lg:gap-4">
        {/* Logo */}
        <Link
          to={""}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold "
        >
          Shopify
        </Link>
        {/* Search Bar */}
        <div className="w-full max-w-md hidden md:block ">
          <SearchBar />
        </div>
        {/* Account */}
        <div className="hidden md:block ">
          <NavbarRight />
        </div>
        {/* menu toggle */}
        <div className="flex gap-5  md:hidden ">
          {" "}
          <div onClick={() => setIsOpen(false)}>
            <Cart />
          </div>
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                fill="currentColor"
                className="bi bi-x "
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                fill="currentColor"
                className="bi bi-list r"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          isOpen
            ? "absolute w-full h-fit top-16 md:hidden block duration-300 ease-in-out"
            : "hidden duration-300 ease-in-out"
        }
      >
        <div className="bg-white shadow-xl p-10 flex flex-col items-center gap-4">
          <SearchBar resPopup={() => setIsOpen(false)} />
          <NavbarRight resPopup={() => setIsOpen(false)}/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
