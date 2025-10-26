import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyMessages from "./pages/PrivacyMessages";
import Services from "./pages/Services";
import About from "./pages/About";
import Cybersecurity from "./pages/Cybersecurity";
import IoT from "./pages/IoT";
import Admin from "./pages/Admin";
import UserManagement from "./pages/UserManagement";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/cybersecurity" element={<Cybersecurity />} />
        <Route path="/services/iot" element={<IoT />} />
        <Route path="/privatemessages" element={<PrivacyMessages />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}
