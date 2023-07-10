import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ showStatus = false, product, url }) {
  const { imageUrl, price, name, id } = product;
  return (
    <Link to={url}>
      <div className="flex h-80 w-40 flex-col rounded-md border border-science-blue-950 bg-white lg:w-52">
        <div>
          <img
            src={process.env.REACT_APP_API_BASE_URL + imageUrl}
            className="h-[222px] w-40 rounded border border-b-science-blue-950 object-cover lg:w-52"
            alt={name}
          />
        </div>
        <div className="flex h-28 flex-col rounded-b-md bg-science-blue-200 px-2 pb-1 pt-3 lg:h-24 lg:px-3">
          <div className="flex h-full flex-col justify-between">
            <p className="text-sm font-semibold capitalize line-clamp-3">
              {name}
            </p>
            <div>
              <p className="text-right text-sm font-bold">
                Rp. {numeral(price).format("0,0")}
              </p>
            </div>
            {/* <div className={`${showStatus ? "block" : "hidden"}`}>Active</div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
