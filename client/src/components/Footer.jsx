import React from 'react'
export default function Footer(){
  return (
    <footer className="main-footer" id="contact-us-footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="logo">
            <img src="/logo.png" alt="IRONHEX Logo" style={{width:250,height:80}} />
          </div>
          <p>Providing robust cybersecurity and innovative IoT solutions to secure your digital future.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about-us.html">About Us</a></li>
          </ul>
        </div>
        <div className="footer-contact-form">
          <h3>Contact Us</h3>
          <form action="#" method="POST">
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">&copy; <span id="currentYear">2025</span> IRONHEX. All rights reserved.</div>
    </footer>
  )
}
