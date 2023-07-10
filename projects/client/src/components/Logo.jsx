import React from "react";
import Icon from "../assets/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex flex-row items-center">
      <img className="h-10 w-auto" src={Icon} alt="Pawt" />
      <p className="ml-2 font-logo">PAWT</p>
    </Link>
  );
}

export default Logo;
