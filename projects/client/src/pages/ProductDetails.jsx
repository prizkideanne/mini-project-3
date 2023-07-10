import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loading from "../components/Loading";
import numeral from "numeral";
import { useSelector } from "react-redux";
import Modal from "./Modal";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/product/getProduct/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((err) => console.log("err", err));
  }, [id]);

  const addToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/cart`,
          {
            productId: id,
            quantity,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => setIsSuccess(true))
        .catch((err) => console.log("err", err));
    }
  };

  return (
    <div className="w-full">
      {product === null ? (
        <Loading />
      ) : (
        <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <Modal
            title={"Success Added To Cart"}
            content={product.name + " is successfully added, happy shopping!"}
            isOpen={isSuccess}
            closeModal={() => {
              setIsSuccess(false);
              navigate("/");
            }}
          />
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold capitalize tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <div className="flex items-center">
                <p className="mt-2 text-lg text-gray-900 sm:text-xl">
                  Rp. {numeral(product.price).format("0,0")}
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={"h-5 w-5 flex-shrink-0 text-yellow-600"}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-2 mt-2 text-sm text-gray-500">our rate</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg border-2 border-science-blue-900">
              <img
                src={process.env.REACT_APP_API_BASE_URL + product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <div className="flex w-full flex-row items-center justify-between">
                <p className="text-lg font-semibold">Quantity</p>
                <div className="flex flex-row items-center">
                  <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity - 1 === 0}
                    className={`h-10 w-10 rounded border border-black bg-white pt-1 text-2xl disabled:border-gray-200 disabled:bg-gray-200`}
                  >
                    -
                  </button>
                  <p className="mx-2 h-10 w-10 pt-2 text-center text-lg">
                    {quantity}
                  </p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded border border-black bg-white pt-1 text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <button
                  onClick={addToCart}
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-science-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-science-blue-700 focus:outline-none focus:ring-2 focus:ring-science-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to cart
                </button>
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 "
                    aria-hidden="true"
                  />
                  <span className="text-gray-500">Lifetime Guarantee</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
