import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct, addWishlistProduct } from "../../Store/ProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);

  const handleRemoveWishlist = (e) => {
    let productInWishlist = [];
    if (localStorage.getItem("wishlist")) {
      productInWishlist = JSON.parse(localStorage.getItem("wishlist"));
    }
    productInWishlist.filter((item, i) => {
      if (e.target.value == i) {
        productInWishlist.splice(i, 1);
      }
    });

    localStorage.setItem("wishlist", JSON.stringify(productInWishlist));
    dispatch(addWishlistProduct());
  };

  useEffect(() => {
    dispatch(addCartProduct());
    dispatch(addWishlistProduct());
  }, [dispatch]);

  return (
    <div className="mx-auto  w-full h-full py-6 ">
      <div className="mx-4">
        <h1 className="text-4xl font-bold font-lora mb-5">Your Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center  ">
            {wishlist.map((item, idx) => {
              return (
                <div key={idx} className="relative w-full max-w-sm">
                  <button
                    className=" hover:bg-red-600 right-[-14px] top-[-20px] bg-red-500 text-center w-10 h-10 font-semibold text-white rounded-full absolute "
                    onClick={handleRemoveWishlist}
                    value={idx}
                  >
                    X
                  </button>
                  <ProductCard
                    id={item.id}
                    products={item}
                    images={item.thumbnail}
                    name={item.title}
                    category={item.category}
                    rating={item.rating}
                    pricing={item.price}
                    discountPercentage={item.discountPercentage}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[56vh] text-2xl text-slate-400 max-md:mb-3">Your wishlist is empty</div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
