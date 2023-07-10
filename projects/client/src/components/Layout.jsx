import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className="flex min-h-screen flex-col bg-science-blue-50">
      <Header />
      <div className="flex flex-grow px-6 lg:px-28 max-w-7xl mx-auto w-full">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
