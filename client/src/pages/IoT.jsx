import React from 'react'

export default function IoT(){
  return (
    <div>
      <section className="page-hero-section iot-hero">
        <div className="page-hero-content">
          <h1>Secure & Seamless IoT Integration</h1>
          <p>Unlock the full potential of your connected devices with IRONHEX's intelligent IoT solutions, designed for security and efficiency.</p>
          <div className="hero-buttons">
            <a href="#iot-features" className="btn-primary">Explore Features</a>
            <a href="#contact-us-footer" className="btn-secondary">Get a Consultation</a>
          </div>
        </div>
      </section>

      <section className="iot-introduction content-section">
        <div className="content-wrapper">
          <h2>Transform Your Business with Smart IoT</h2>
          <p>The Internet of Things (IoT) is revolutionizing industries by connecting physical devices to the internet, enabling them to collect and exchange data. At IRONHEX, we empower your business to harness this power through secure, scalable, and intelligent IoT solutions.</p>
          <p>From smart infrastructure to industrial automation, our experts design, implement, and manage IoT ecosystems that drive efficiency, innovation, and growth while ensuring robust security from edge to cloud.</p>
        </div>
      </section>

      <section id="iot-features" className="iot-features content-section bg-light">
        <div className="content-wrapper">
          <h2>Our Comprehensive IoT Service Offerings</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-microchip"></i></div>
              <h3>IoT Strategy & Consulting</h3>
              <p>Develop a clear IoT roadmap aligned with your business objectives, from device selection to platform integration.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-network-wired"></i></div>
              <h3>Secure IoT Device Management</h3>
              <p>Ensure the secure provisioning, monitoring, and updating of all your connected devices throughout their lifecycle.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-cloud"></i></div>
              <h3>Cloud Integration & Data Analytics</h3>
              <p>Seamlessly connect your IoT devices to cloud platforms and derive actionable insights from collected data.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-lock"></i></div>
              <h3>IoT Security & Compliance</h3>
              <p>Implement multi-layered security protocols and ensure compliance with industry standards to protect your IoT ecosystem.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-robot"></i></div>
              <h3>Edge Computing Solutions</h3>
              <p>Process data closer to the source for real-time decision-making, reduced latency, and enhanced security.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper"><i className="fas fa-industry"></i></div>
              <h3>Industrial IoT (IIoT)</h3>
              <p>Optimize manufacturing, supply chain, and asset management with robust and secure IIoT implementations.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
