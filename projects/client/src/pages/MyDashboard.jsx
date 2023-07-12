import React from "react";
import { useSelector } from "react-redux";

function MyDashboard() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-full flex-grow items-center justify-center font-semibold">
      Hello, {user.username}!
    </div>
  );
}

export default MyDashboard;
