import React from "react";

function ProductCard({ showStatus = false }) {
  return (
    <div className="border rounded-md w-40 border-black">
      <div>Product Card</div>
      <div className={`${showStatus ? "block" : "hidden"}`}>Active</div>
    </div>
  );
}

export default ProductCard;
