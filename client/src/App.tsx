import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/Toast";
import { ScrollProgress } from "./utils/animations";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { HelmetProvider } from 'react-helmet-async';

// Eagerly load critical pages
import Home from "./pages/Home";
import About from "./pages/About";

// Lazy load less critical pages
const Services = lazy(() => import("./pages/Services"));
const Cybersecurity = lazy(() => import("./pages/Cybersecurity"));
const IoT = lazy(() => import("./pages/IoT"));
const SoftwareSolutions = lazy(() => import("./pages/SoftwareSolutions"));
const FAQ = lazy(() => import("./pages/FAQ"));
const TunisianRegulations = lazy(() => import("./pages/TunisianRegulations"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Admin = lazy(() => import("./pages/Admin"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const DemoRequests = lazy(() => import("./pages/DemoRequests"));
const PrivacyMessages = lazy(() => import("./pages/PrivacyMessages"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function AppContent() {
  const location = useLocation();
  
  // Hide Navbar and Footer on admin pages
  const isAdminPage = location.pathname.startsWith('/admin') || 
                      location.pathname === '/privatemessages';
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ScrollProgress />
        {!isAdminPage && <Navbar />}
        <Suspense fallback={<LoadingSpinner />}>
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
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
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
        </Suspense>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <ScrollToTop />}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppContent />
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
