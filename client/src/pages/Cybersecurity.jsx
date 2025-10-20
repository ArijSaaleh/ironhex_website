import React from 'react'

export default function Cybersecurity(){
  return (
    <div>
      <section className="page-hero-section cybersecurity-hero">
        <div className="page-hero-content">
          <h1>Fortify Your Digital Fortress</h1>
          <p>IRONHEX provides comprehensive cybersecurity solutions to protect your business from evolving threats and ensure digital resilience.</p>
          <div className="hero-buttons">
            <a href="#cyber-offerings" className="btn-primary">Our Offerings</a>
            <a href="#contact-us-footer" className="btn-secondary">Request an Audit</a>
          </div>
        </div>
      </section>

      <section className="cybersecurity-introduction content-section">
        <div className="content-wrapper">
          <h2>Proactive Defense in a Complex Digital Landscape</h2>
          <p>In today's interconnected world, cybersecurity is not just a necessity; it's the foundation of business continuity and trust. IRONHEX offers a full spectrum of cybersecurity services designed to identify, protect, detect, respond, and recover from cyber threats.</p>
          <p>We combine cutting-edge technology with expert human intelligence to build multi-layered defenses that safeguard your data, systems, and reputation against sophisticated attacks.</p>
        </div>
      </section>

      <section id="cyber-offerings" className="cyber-offerings content-section bg-light">
        <div className="content-wrapper">
          <h2>Our Cybersecurity Service Spectrum</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-user-shield"></i></div>
              <h3>Managed Security Services</h3>
              <p>24/7 monitoring, threat detection, and rapid response by our Security Operations Center (SOC) experts.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-virus-slash"></i></div>
              <h3>Vulnerability Management</h3>
              <p>Regular scanning, penetration testing, and risk assessments to identify and mitigate security weaknesses.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-cloud-meatball"></i></div>
              <h3>Cloud Security</h3>
              <p>Secure your cloud infrastructure (AWS, Azure, GCP), applications, and data with robust controls.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-shield-alt"></i></div>
              <h3>Endpoint Protection</h3>
              <p>Advanced protection for all devices, from laptops to servers, against malware, ransomware, and zero-day threats.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-fingerprint"></i></div>
              <h3>Identity & Access Management (IAM)</h3>
              <p>Control who has access to what, ensuring secure authentication and authorization across your organization.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-file-contract"></i></div>
              <h3>Compliance & Governance</h3>
              <p>Navigate complex regulatory landscapes (GDPR, HIPAA, ISO 27001) with our expert guidance and solutions.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
