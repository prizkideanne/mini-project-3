import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const getCategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  };

  const onSelectCategory = (category) => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const onSelectSort = (sort) => {
    axios
      .get(`https://fakestoreapi.com/products?sort=${sort}`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex w-full items-center justify-center ">
      <div className="flex max-w-[1366px] flex-col items-center justify-center p-5">
        <div className="mb-5 flex w-full flex-row items-center gap-5">
          <SortDropdown onSelectSort={onSelectSort} />
          <FilterDropdown
            categories={categories}
            onSelectCategory={onSelectCategory}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
