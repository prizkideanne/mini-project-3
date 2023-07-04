import React from "react";
import ProductCard from "../components/ProductCard";

function LandingPage() {
  return (
    <div>
      <ProductCard showStatus />
      <ProductCard />
    </div>
  );
}

export default LandingPage;
