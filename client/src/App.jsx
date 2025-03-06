import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Payment from "./Pages/Payment";
import Admin_Payment from "./Admin/Admin_Payment";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" containerStyle={{ top: 60 }} />

      <Routes>
        <Route index element={<Admin_Payment />} />
        <Route path="/admin/payments" element={<Admin_Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
