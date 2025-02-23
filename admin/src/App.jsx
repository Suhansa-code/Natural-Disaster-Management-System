import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { updateUser } from "./Redux/AuthSlice";
import AdminLayout from "../Layouts/AdminLayout";

import "./App.css";

import Login from "./Pages/Login";

import ProductAdding from "./Pages/Admin/ProductAdding";
import UserManagement from "./Pages/Admin/UserManagement";

import Inventory from "./Pages/Admin/Inventory";
import AdminPurchaseManagement from "./Pages/Admin/AdminPurchaseManagement ";
import Register from "./Pages/Register";

function App() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(updateUser());
    }
  }, [user?.id, dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" containerStyle={{ top: 60 }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          <Route
            path="purchase-management"
            element={<AdminPurchaseManagement />}
          />
          <Route path="inventory" element={<Inventory />} />
          <Route path="product" element={<ProductAdding />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
