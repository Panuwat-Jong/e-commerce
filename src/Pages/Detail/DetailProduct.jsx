import React from "react";
import { useParams } from "react-router-dom";
function DetailProduct() {
  const { name } = useParams();
  const productName = name.slice(1);

  return <div>{productName}</div>;
}

export default DetailProduct;
