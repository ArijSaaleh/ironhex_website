import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyMessages from "./pages/PrivacyMessages";
import Services from "./pages/Services";
import About from "./pages/About";
import Cybersecurity from "./pages/Cybersecurity";
import IoT from "./pages/IoT";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/cybersecurity" element={<Cybersecurity />} />
        <Route path="/services/iot" element={<IoT />} />
        <Route path="/privatemessages" element={<PrivacyMessages />} />
      </Routes>
      <Footer />
    </div>
  );
}
