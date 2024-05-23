import React, { useEffect, useState } from "react";

function ImageDetailProduct({ images }) {
  let [mainImages, setMainImages] = useState(images[0]);


  return (
    <div className="flex flex-col col-span-2 w-full">
      <img
        src={mainImages}
        alt="product"
        className="sm:w-full mb-3 w-64  max-w-sm h-64 self-center "
      />
      <div className="flex space-x-1 items-center w-full  overflow-auto">
        {images?.map((image, idx) => {
          return (
            <img
              src={image}
              alt="product"
              key={idx}
              className="cursor-pointer hover:outline w-full max-w-14 "
              onClick={() => setMainImages(images[idx])}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImageDetailProduct;
