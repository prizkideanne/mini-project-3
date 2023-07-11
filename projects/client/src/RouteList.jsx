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
import ModifyProduct from "./pages/ModifyProduct";
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
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
        </Route>
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <MyDashboard />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/store"
            element={
              <DashboardLayout>
                <MyStore />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/transaction"
            element={
              <DashboardLayout>
                <MyTransaction />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/income"
            element={
              <DashboardLayout>
                <GrossIncome />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/category"
            element={
              <DashboardLayout>
                <CategoryForm />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/transactions"
            element={
              <DashboardLayout>
                <MyTransaction />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/product"
            element={
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            }
          />
        </Route>

        <Route element={<PrivateWrapper />}>
          <Route
            path="/dashboard/store/modify-product/:id"
            element={
              <DashboardLayout>
                <ModifyProduct />
              </DashboardLayout>
            }
          />
        </Route>

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
