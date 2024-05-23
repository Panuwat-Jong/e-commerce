import { useState } from "react";
import { calDiscountPercentage } from "../../../../Utils/Other";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, uniqWith } from "lodash";
import { useEffect } from "react";
import { addCartProduct } from "../../../../Store/ProductSlice";

function CartModel({
  image,
  name,
  price,
  discountPercentage,
  count,
  stock,
  id,
}) {
  let cart = useSelector((state) => state.products.cart);
  let [isCount, setIsCount] = useState(count);
  const dispatch = useDispatch();

  useEffect(() => {
    updateCountInLocal();
    dispatch(addCartProduct());
  }, [isCount]);

  const updateCountInLocal = () => {
    let initCount = cart.map((item) => {
      if (item.id === id) {
        return { ...item, count: isCount };
      } else {
        return item;
      }
    });
    let unique = uniqWith(initCount, isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch(addCartProduct());
  };

  const handleAddCount = () => {
    if (isCount < stock) {
      return setIsCount(isCount + 1);
    } else {
      alert("Out of Stock");
    }
  };
  const handleMinusCount = () => {
    if (isCount > 1) {
      return setIsCount(isCount - 1);
    } else {
      handleRemoveProduct();
    }
  };

  const handleRemoveProduct = () => {
    let productInCart = [];
    if (localStorage.getItem("cart")) {
      productInCart = JSON.parse(localStorage.getItem("cart"));
    }
    productInCart.map((item, i) => {
      if (item.id === id) {
        productInCart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(productInCart));
    dispatch(addCartProduct());
    alert("Remove Product !!!");
  };

  return (
    <div>
      <div className="mb-2 border grid grid-cols-7 w-full  gap-2">
        {/* product image */}
        <div className="w-full col-span-2">
          {image ? (
            <img
              src={image[0]}
              alt="product"
              className="w-24 h-24 object-contain"
            />
          ) : null}
        </div>
        {/* product name */}
        <div className="w-full col-span-3 flex flex-col justify-center ml-3">
          <div>
            <p className="text-base font-semibold justify-center items-center">
              {name}
            </p>
            <p>
              {`$${calDiscountPercentage(price, discountPercentage)}`} {"\n"}
            </p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <div onClick={handleMinusCount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-dash-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </div>
            <span className="font-semibold">{isCount}</span>
            <div onClick={handleAddCount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="blue"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Discount price product*/}
        <div className="w-full self-center col-span-2">
          <p className="text-base font-semibold">{`${
            calDiscountPercentage(price, discountPercentage) * isCount
          } `}</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              onClick={handleRemoveProduct}
              className="bi bi-trash w-6 h-6 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModel;
