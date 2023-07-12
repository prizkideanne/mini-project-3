import React from "react";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function ProductList({
  products,
  sorts,
  categories,
  onSelectCategory,
  onSelectSort,
  onClickNext,
  onClickPrevious,
  disableNext,
  disablePrevious,
  title,
}) {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("dashboard");
  return (
    <div className="flex w-full">
      {products.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>You don't have any product on listing...</p>
        </div>
      ) : (
        <div className="my-5 flex flex-col items-center">
          <h1 className="mb-5 w-full text-left font-logo text-2xl capitalize">
            {title}
          </h1>
          <div className="mb-5 flex w-full flex-row items-center gap-5">
            <Dropdown
              items={sorts}
              label="Sort"
              onSelectDropdown={onSelectSort}
            />
            <Dropdown
              items={categories}
              label="Filter"
              onSelectDropdown={onSelectCategory}
            />
          </div>
          <div className="grid grid-cols-2 justify-start gap-2 md:flex md:flex-row md:flex-wrap md:gap-3 lg:gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                url={
                  isDashboard
                    ? `/dashboard/store/modify-product/${product.id}`
                    : `/product/${product.id}`
                }
              />
            ))}
          </div>
          <Pagination
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
            disableNext={disableNext}
            disablePrevious={disablePrevious}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
