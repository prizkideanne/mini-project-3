import React from "react";

function ProductCard({ showStatus = false }) {
  return (
    <div className="border rounded-md w-40 border-black">
      <div className='flex flex-col justify-main item-center h-screen w-screen'>
        <div className=' mb-8 flex justify-center'>
          <img className="w-screen h-80 box-border h-40 w-40 p-4 border-4 item" src="https://www.blibli.com/friends-backend/wp-content/uploads/2022/08/5-Ciri-Sepatu-Warrior-Asli-Kamu-Wajib-Tahu.jpeg" alt="" />
        </div>
        <span className="text-2xl">Sepatu</span>
        <span className="text-xl">Product Price</span>
        <button type="submit" className="text-base text-slate-100	bg-indigo-500">Chart</button>

      </div>
      <div className={`${showStatus ? "block" : "hidden"}`}>Active</div>
    </div>
  );
}

export default ProductCard;
