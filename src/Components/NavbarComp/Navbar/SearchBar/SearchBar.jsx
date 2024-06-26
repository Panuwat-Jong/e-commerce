/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../../Store/ProductSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ resPopup }) {
  const product = useSelector((state) => state.products.itemFull);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [isPopupSearch, setIsPopupSearch] = useState(false);
  let [store, setStore] = useState([]);

  const findProduct = (value) => {
    const result = product.products.filter((item) => {
      if (value && value.length > 1) {
        return item?.title
          ?.toLowerCase()
          ?.trim()
          ?.includes(value?.toLowerCase());
      }
    });
    return setStore(result);
  };

  const handleOnChange = (searchProduct) => {
    setIsPopupSearch(true);
    findProduct(searchInput);
    setSearchInput(searchProduct);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={searchInput}
        onChange={(e) => handleOnChange(e.target.value)}
        type="text"
        className="w-full border-2 border-blue-500 px-6 py-3 rounded-full "
        placeholder="Search for a Product..."
      />
      <div className="bg-blue-500 absolute top-1 right-1 p-2 rounded-full hover:opacity-75">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="white"
          className="bi bi-search "
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
      {isPopupSearch && searchInput.length > 0 ? (
        <div className="absolute w-full md:max-w-sm lg:left-6 bg-white flex flex-col shadow-md overflow-y-scroll ">
          {store.map((item) => {
            return (
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                onClick={() => {
                  resPopup(), setIsPopupSearch(false);
                }}
                className="px-2 py-1 border-b hover:bg-slate-100 first-of-type:pt-5 z-50 bg-white"
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBar;
