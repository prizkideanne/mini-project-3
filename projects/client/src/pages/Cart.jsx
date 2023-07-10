import React from "react";

const sampleData = [
  {
    id: 1,
    image:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/17/76dcf5fe-a95f-4e84-9e90-f267990682b4.jpg",
    amount: 1,
    title: "Macbook Air",
    price: "Rp. 20.000.000",
  },
  {
    id: 2,
    image:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/17/76dcf5fe-a95f-4e84-9e90-f267990682b4.jpg",
    amount: 1,
    title: "Macbook Air",
    price: "Rp. 20.000.000",
  },
  {
    id: 3,
    image:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/17/76dcf5fe-a95f-4e84-9e90-f267990682b4.jpg",
    amount: 1,
    title: "Macbook Air",
    price: "Rp. 20.000.000",
  },
  {
    id: 4,
    image:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/17/76dcf5fe-a95f-4e84-9e90-f267990682b4.jpg",
    amount: 1,
    title: "Macbook Air",
    price: "Rp. 20.000.000",
  },
  {
    id: 5,
    image:
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/7/17/76dcf5fe-a95f-4e84-9e90-f267990682b4.jpg",
    amount: 1,
    title: "Macbook Air",
    price: "Rp. 20.000.000",
  },
];

function Cart() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full p-3 lg:w-[720px]">
        <h1 className="mb-3 text-xl font-bold">Your Cart</h1>
        <div className="flex flex-col gap-3">
          {sampleData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-full flex-row rounded-md bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-32 object-cover"
                />
                <div className="flex flex-col justify-between p-2">
                  <div className="flex flex-col">
                    <p className="text-xl">{item.title}</p>
                    <p className="text-sm">Quantity: {item.amount}</p>
                  </div>
                  <p className="text-lg font-semibold">{item.price}</p>
                </div>
              </div>
            );
          })}
          <div className="cursor-pointer rounded-md bg-green-400 p-3 text-center">
            <p className="text-lg font-semibold">Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
