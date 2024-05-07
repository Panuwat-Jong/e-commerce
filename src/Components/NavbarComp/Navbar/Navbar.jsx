import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import NavbarRight from "./NavbarRight/NavbarRight";

function Navbar() {
  return (
    <nav className="max-h-20  mx-auto w-full py-4 border-b shadow-md">
      <div className="mx-4  flex justify-between items-center">
        {/* Logo */}
        <Link to={""} className="text-4xl font-semibold">
          Shopify
        </Link>
        {/* Search Bar */}
        <SearchBar />
        {/* Account */}
        <NavbarRight />
      </div>
    </nav>
  );
}

export default Navbar;
