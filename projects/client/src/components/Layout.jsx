import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F3ECD7]">
      <Header />
      <div className="flex flex-grow">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
