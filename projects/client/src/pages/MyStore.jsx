import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";

const sorts = [
  { title: "Oldest", value: "asc" },
  { title: "Newest", value: "desc" },
];

function MyStore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(true);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (currentPage + 1 > totalPage) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }

    if (currentPage - 1 === 0) {
      setDisablePrevious(true);
    } else {
      setDisablePrevious(false);
    }
  }, [currentPage, totalPage]);

  const getProducts = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/product/getAllProduct?perPage=6`
      )
      .then(({ data }) => {
        const items = data.data.map(({ id, imageUrl, price, name }) => {
          return {
            id,
            imageUrl,
            price,
            name,
          };
        });
        setProducts(items);
        setTotalPage(data.pagination.totalPage);
      })
      .catch((err) => console.log(err));
  };

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/category/getAllCategories`)
      .then(({ data }) => {
        const items = data.data.map(({ id, name }) => ({
          value: id,
          title: name,
        }));

        setCategories(items);
      })
      .catch((err) => console.log(err));
  };

  const onSelectCategory = (category) => {
    console.log("category", category);
  };

  const onSelectSort = (sort) => {
    console.log("sort", sort);
  };

  const onClickNext = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/product/getAllProduct?perPage=6&page=${currentPage + 1}`
      )
      .then(({ data }) => {
        const items = data.data.map(({ id, imageUrl, price, name }) => {
          return {
            id,
            imageUrl,
            price,
            name,
          };
        });
        setCurrentPage(data.pagination.page);
        setProducts(items);
      })
      .catch((err) => console.log(err));
  };

  const onClickPrevious = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/product/getMyProduct?perPage=6&page=${currentPage - 1}`
      )
      .then(({ data }) => {
        const items = data.data.map(({ id, imageUrl, price, name }) => {
          return {
            id,
            imageUrl,
            price,
            name,
          };
        });
        setCurrentPage(data.pagination.page);
        setProducts(items);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ProductList
      title={`${user.storeName} Products`}
      categories={categories}
      products={products}
      disableNext={disableNext}
      disablePrevious={disablePrevious}
      onClickNext={onClickNext}
      onClickPrevious={onClickPrevious}
      onSelectCategory={onSelectCategory}
      onSelectSort={onSelectSort}
      sorts={sorts}
    />
  );
}

export default MyStore;
