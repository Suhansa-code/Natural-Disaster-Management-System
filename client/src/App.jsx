import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import { Toaster } from "react-hot-toast";

import "./App.css";

import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Pages/ContactUs";
import ProductDescription from "./Pages/ProductDescription";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" containerStyle={{ top: 60 }} />
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route
          path="product-description/:id"
          element={<ProductDescription />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
