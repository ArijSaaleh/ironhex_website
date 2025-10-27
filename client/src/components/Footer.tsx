import React from 'react'
import ContactForm from '../components/ContactForm'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer id="contact-us-footer" className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Providing robust cybersecurity and innovative IoT solutions to secure your digital future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            <li> Our Services <ul className="space-y-3 pl-4">
               <li>
                <Link to="/services/cybersecurity" className="text-gray-300 hover:text-white transition-colors">
                  Cybersecurity 
                </Link>
              </li>
              <li>
                <Link to="/services/iot" className="text-gray-300 hover:text-white transition-colors">
                  IoT 
                </Link>
              </li>
              <li>
                <Link to="/services/software" className="text-gray-300 hover:text-white transition-colors">
                  Software
                </Link>
              </li>
             </ul></li>
              <li>
                <Link to="/regulations" className="text-gray-300 hover:text-white transition-colors">
                  Tunisian Regulations
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} IRONHEX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


