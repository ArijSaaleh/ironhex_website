import React from 'react'
import { Link } from 'react-router-dom'

export default function Services(){
  return (
    <div className="content-section">
      <div className="content-wrapper">
        <h2>Our Services</h2>
        <p>We specialise in Cybersecurity and IoT solutions tailored to your needs. Select a service area below to learn more.</p>

        <div className="service-cards" style={{marginTop:24}}>
          <div className="card">
            <div className="icon-wrapper"><i className="fas fa-shield-alt"></i></div>
            <h3>Cybersecurity Services</h3>
            <p>Proactive defenses, managed security, and compliance guidance.</p>
            <Link to="/services/cybersecurity" className="learn-more-link">Explore Cybersecurity</Link>
          </div>

          <div className="card">
            <div className="icon-wrapper"><i className="fas fa-cog"></i></div>
            <h3>IoT Services</h3>
            <p>Secure device integration, edge computing, and analytics.</p>
            <Link to="/services/iot" className="learn-more-link">Explore IoT</Link>
          </div>
        </div>

      </div>
    </div>
  )
}
