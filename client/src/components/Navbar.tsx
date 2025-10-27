import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const closeMenus = () => {
    setOpen(false)
    setServicesOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="IRONHEX Logo" className="h-12 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-primary font-semibold transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-primary font-semibold transition-colors">
            About Us
          </Link>
          
          {/* Desktop Services Dropdown */}
          <div className="relative"
               onMouseEnter={() => setServicesOpen(true)}
               onMouseLeave={() => setServicesOpen(false)}>
            <button className="text-gray-700 hover:text-primary font-semibold transition-colors">
              Services <span className="ml-1">▾</span>
            </button>
            {/* Added padding to prevent mouse gap */}
            <div className={`absolute left-0 pt-2 ${servicesOpen ? 'block' : 'hidden'}`}>
              <ul className="bg-white border rounded-lg shadow-lg py-2 w-48">
                <li className="hover:bg-gray-50">
                  <Link to="/services/cybersecurity"
                        className="block px-4 py-2 text-gray-700 hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    Cybersecurity 
                  </Link>
                </li>
                <li className="hover:bg-gray-50">
                  <Link to="/services/iot"
                        className="block px-4 py-2 text-gray-700 hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    IoT 
                  </Link>
                </li>
                <li className="hover:bg-gray-50">
                  <Link to="/services/software"
                        className="block px-4 py-2 text-gray-700 hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    SaaS
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <a href="#contact-us-footer" 
             className="px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors font-semibold">
            Contact Us
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} 
                className="p-2 rounded-md md:hidden">
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-gray-800 transform transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-gray-800 transform transition-opacity ${open ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-gray-800 transform transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t transform transition-transform duration-200 ${open ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="px-6 py-4 space-y-4">
          <Link to="/" 
                onClick={closeMenus}
                className="block text-gray-700 hover:text-primary font-semibold">
            Home
          </Link>
          <Link to="/about"
                onClick={closeMenus}
                className="block text-gray-700 hover:text-primary font-semibold">
            About Us
          </Link>
          <div className="py-2">
            <div className="font-semibold text-gray-700 mb-2">Services</div>
            <Link to="/services/cybersecurity"
                  onClick={closeMenus}
                  className="block pl-4 py-1 text-gray-600 hover:text-primary">
              Cybersecurity
            </Link>
            <Link to="/services/iot"
                  onClick={closeMenus}
                  className="block pl-4 py-1 text-gray-600 hover:text-primary">
              IoT
            </Link>
          </div>
          <a href="#contact-us-footer"
             onClick={closeMenus}
             className="block text-gray-700 hover:text-primary font-semibold">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
