import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import numeral from "numeral";
import Modal from "./Modal";
import moment from "moment";

function Cart() {
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [orderDetail, setOrderDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    let subTotal = 0;
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/cart/getCart`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const items = data.data.map(({ Product, quantity, id }) => {
          const price = Product.price;
          subTotal = subTotal + price * quantity;

          return {
            id: id,
            imageUrl: process.env.REACT_APP_API_BASE_URL + Product.imageUrl,
            price,
            quantity,
            name: Product.name,
          };
        });
        setItems(items);
        setSubTotal(subTotal);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const checkout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/orderDetail/createOrderDetail`,
        {
          address,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(({ data }) => {
        setOrderDetail({
          total: data.data.orderDetail.total,
          address: data.data.orderDetail.address,
          createdAt: data.data.orderDetail.createdAt,
        });
        setIsOpen(true);
      })
      .catch((err) => console.log("err", err));
  };

  const removeItemCart = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/cart/deleteCart/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        getCart();
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="flex w-full">
      <Modal
        title={"Payment Success"}
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
          navigate("/");
        }}
      >
        <div className="my-5 flex w-full flex-col items-center">
          <div className="flex w-full flex-row items-center justify-between">
            <p>Shipped to:</p>
            <p className="font-semibold uppercase">{orderDetail?.address}</p>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <p>Total Paid:</p>
            <p className="font-semibold uppercase">
              Rp. {numeral(orderDetail?.total).format("0,0")}
            </p>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <p>Purchased At</p>
            <p className="font-semibold uppercase">
              {moment(orderDetail?.createdAt).format("D MMMM YYYY")}
            </p>
          </div>
        </div>
      </Modal>
      {items.length === 0 ? (
        <div className="flex h-full w-full flex-grow flex-col items-center justify-center ">
          <p className="mb-5 text-2xl font-bold">
            You have nothing in your cart :(
          </p>
          <p className="text-xl font-semibold">Please shop more!</p>
        </div>
      ) : (
        <div className="my-5 w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <p className="text-lg font-medium capitalize text-gray-700 hover:text-gray-900">
                              {product.name}
                            </p>
                          </h4>
                          <p className="ml-4 text-lg font-medium text-gray-900">
                            Rp. {numeral(product.price).format("0,0")}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              Quantity
                            </p>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {product.quantity} pcs
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />

                          <span>In stock</span>
                        </p>
                        <div className="ml-4">
                          <button
                            onClick={() => removeItemCart(product.id)}
                            type="button"
                            className="text-sm font-medium text-science-blue-600 hover:text-science-blue-500"
                          >
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-10">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-lg font-medium text-gray-900">
                      Subtotal
                    </dt>
                    <dd className="ml-4 text-lg font-medium text-gray-900">
                      Rp. {numeral(subTotal).format("0,0")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-12">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add your Address Before Checkout
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="address"
                    id="address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-science-blue-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={checkout}
                  disabled={address.length === 0}
                  className="w-full rounded-md border border-transparent bg-science-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-science-blue-700 focus:outline-none focus:ring-2 focus:ring-science-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-500"
                >
                  Complete Payment
                </button>
              </div>

              <div className="mt-6 text-center text-sm">
                <p>
                  or{" "}
                  <Link
                    to="/"
                    className="font-medium text-science-blue-600 hover:text-science-blue-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
