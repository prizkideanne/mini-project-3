import React from "react";

function ProductCard({ showStatus = false, product }) {
  const { title, price, category, image } = product;
  return (
    <div className="flex h-72 w-40 flex-col rounded-md border border-black bg-white lg:h-80 lg:w-52">
      <img
        src={image}
        className="h-44 w-40 rounded-t-md border border-b-black object-cover lg:h-56 lg:w-52"
        alt={title}
      />
      <div className="flex h-28 flex-col p-1 lg:h-24 lg:px-3">
        <p className="text-sm font-bold capitalize">{category}</p>
        <div className="flex h-full flex-col justify-between">
          <p className="text-xs line-clamp-3">{title}</p>
          <div>
            <p className="text-right text-sm font-bold">USD {price}</p>
          </div>
          {/* <div className={`${showStatus ? "block" : "hidden"}`}>Active</div> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
