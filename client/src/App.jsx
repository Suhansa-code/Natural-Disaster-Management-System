import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./Components/main-components/ModalContext";
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
import Home from "./components/main-components/homecomp/Home";
import About from "./components/main-components/About";
import FloodPredictor from "./Components/main-components/prediction-model/floodPredictor";
import { UserManagement } from "./Pages/UserManagement";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/main-components/ProtectedRoute";
import NotFound from "./Pages/NotFound";

//Disaster management imports
import ViewDisaster from "./Components/disaster-management/ViewDisaster";
import AdminDisasterView from "./Components/disaster-management/adminDisasterView";

//Comunity-support imports
import PostView from "./components/community-support/PostView";

import ViewPosts from "./components/community-support/adminPostsView";
import Navbar from "./Components/main-components/Navbar";

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
      <ModalProvider>
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
              <Route path="/User-management" element={<UserManagement />} />
              <Route path="/flood-predictor" element={<FloodPredictor />} />

              {/* Disaster management */}
              <Route path="/Disaster" element={<ViewDisaster />} />

              {/* Comunity-support */}
              <Route
                path="/community"
                element={
                  <ProtectedRoute>
                    <PostView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/posts"
                element={
                  <ProtectedRoute>
                    <ViewPosts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/disaster"
                element={
                  <ProtectedRoute>
                    <AdminDisasterView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/postsview"
                element={
                  <ProtectedRoute>
                    <ViewPosts />
                  </ProtectedRoute>
                }
              />

              {/* Funding Management */}
              <Route
                path="/Funding"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute>
                    <Admin_Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
