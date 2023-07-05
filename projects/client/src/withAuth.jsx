import React from "react";
import { Navigate } from "react-router-dom";

export default function withAuth(OriginalComponent) {
  return (props) => {
    if (localStorage.getItem("token")) {
      return <OriginalComponent {...props} />;
    }
    return <Navigate to="/login" replace />;
  };
}
// console.log(withAuth, "Asdasdad")
// export default withAuth;
