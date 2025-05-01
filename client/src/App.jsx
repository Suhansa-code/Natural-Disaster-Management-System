import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Payment from "./Pages/Payment";
import Admin_Payment from "./Admin/Admin_Payment";
import Dashboard from "./Admin/Dashboard";
import { AnimatePresence } from "framer-motion";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Profile from "./Pages/Profile";

//Main Component Imports
import Home from "./components/main-components/homecomp/home";
import UserLogin from "./components/main-components/Userlog/userlogin";
import About from "./components/main-components/About";
import FloodPredictor from "./Components/main-components/prediction-model/floodPredictor";

//Disaster management imports
import AddDisaster from "./components/disaster-management/addDisaster";
import ViewDisaster from "./components/disaster-management/ViewDisaster";
import UpdateDisaster from "./components/disaster-management/updateDisaster";

//Comunity-support imports
import PostView from "./components/community-support/PostView";
import AdminPanel from "./Admin/AdminPanel";
import ViewPosts from "./components/community-support/adminPostsView";
import Navbar from "./Components/main-components/Navbar";

import { AuthProvider } from "./context/AuthContext";

const hideNavbarRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" containerStyle={{ top: 60 }} />
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/flood-predictor" element={<FloodPredictor />} />

            {/* Disaster management */}
            <Route path="/Disaster" element={<ViewDisaster />} />
            <Route path="/add-disaster" element={<AddDisaster />} />
            <Route path="/UpdateDisaster/:id" element={<UpdateDisaster />} />

            {/* Comunity-support */}
            <Route path="/community" element={<PostView />} />
            <Route path="/admin/posts" element={<ViewPosts />} />
            <Route path="/admin/postsview" element={<ViewPosts />} />

            {/* Funding Management */}
            <Route path="/Funding" element={<Payment />} />
            <Route path="/admin/payments" element={<Admin_Payment />} />
            <Route path="/admin/Dashboard" element={<Dashboard />} />
          </Routes>{" "}
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
