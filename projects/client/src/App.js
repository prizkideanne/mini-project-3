import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import CategoryForm from "./pages/CategoryForm";
import GrossIncome from "./pages/GrossIncome";
import MyDashboard from "./pages/MyDashboard";
import MyStore from "./pages/MyStore";
import MyTransaction from "./pages/MyTransaction";
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-dashboard" element={<MyDashboard />} />
        <Route path="/my-dashboard/my-store" element={<MyStore />} />
        <Route path="/my-dashboard/my-transaction" element={<MyTransaction />} />
        <Route path="/my-dashboard/gross-income" element={<GrossIncome />} />
        <Route path="/my-dashboard/category-form" element={<CategoryForm />} />
        <Route path="/my-dashboard/product-form" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
