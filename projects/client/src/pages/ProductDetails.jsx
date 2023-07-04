import React from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  return <div>product with id: {id}</div>;
}

export default ProductDetails;
