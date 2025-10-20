import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="IRONHEX Logo" style={{width:330,height:80}} />
      </div>
      <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={`hamburger ${open ? 'open' : ''}`}></span>
      </button>
      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About Us</Link></li>
          <li className="dropdown">
            <span className="dropdown-toggle">Services ▾</span>
            <ul className="dropdown-menu">
              <li><a href="/services#cybersecurity">Cybersecurity Services</a></li>
              <li><a href="/services#iot">IoT Services</a></li>
            </ul>
          </li>
          <li><a href="#contact-us-footer" className="btn-secondary">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  )
}
