import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PrivacyMessages from './pages/PrivacyMessages'
import Services from './pages/Services'
import About from './pages/About'
import ContactForm from './components/ContactForm'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="page-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privatemessages" element={<PrivacyMessages />} />
      </Routes>
      <Footer />
    </div>
  )
}
