import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyMessages from "./pages/PrivacyMessages";
import Services from "./pages/Services";
import About from "./pages/About";
import Cybersecurity from "./pages/Cybersecurity";
import IoT from "./pages/IoT";
import Admin from "./pages/Admin";
import UserManagement from "./pages/UserManagement";
import DemoRequests from "./pages/DemoRequests";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import SoftwareSolutions from "./pages/SoftwareSolutions";
import FAQ from "./pages/FAQ";
import TunisianRegulations from "./pages/TunisianRegulations";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

function AppContent() {
  const location = useLocation();
  
  // Hide Navbar and Footer on admin pages
  const isAdminPage = location.pathname.startsWith('/admin') || 
                      location.pathname === '/privatemessages';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {!isAdminPage && <Navbar />}
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

        <Route path="/admin/messages" element={<Admin />} />
        <Route path="/services/software" element={<SoftwareSolutions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/regulations" element={<TunisianRegulations />} />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/demo-requests"
          element={
            <ProtectedRoute>
              <DemoRequests />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <ScrollToTop />}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
