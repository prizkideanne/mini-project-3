import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateWrapper from "./PrivateWrapper";
import PublicWrapper from "./PublicWrapper";

// routes
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
import { useDispatch } from "react-redux";
import { getUser } from "./store/userReducer/userSlice";
import DashboardLayout from "./components/DashboardLayout";

function RouteList() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route element={<PrivateWrapper />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/my-dashboard"
          element={
            <DashboardLayout>
              <MyDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-dashboard/my-store"
          element={
            <DashboardLayout>
              <MyStore />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-dashboard/my-transaction"
          element={
            <DashboardLayout>
              <MyTransaction />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-dashboard/gross-income"
          element={
            <DashboardLayout>
              <GrossIncome />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-dashboard/category-form"
          element={
            <DashboardLayout>
              <CategoryForm />
            </DashboardLayout>
          }
        />
        <Route
          path="/my-dashboard/product-form"
          element={
            <DashboardLayout>
              <ProductForm />
            </DashboardLayout>
          }
        />
        {/* Auth */}
        <Route element={<PublicWrapper />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PublicWrapper />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteList;
