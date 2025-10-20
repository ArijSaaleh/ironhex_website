import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="IRONHEX Logo" style={{width:250,height:80}} />
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><a href="#contact-us-footer" className="btn-secondary">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  )
}
