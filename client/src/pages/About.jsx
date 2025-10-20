import React from 'react'

export default function About(){
  return (
    <div>
      <section className="page-header">
        <h1>About IRONHEX</h1>
        <p className="lead">We secure modern businesses with a blend of cybersecurity expertise and IoT innovation.</p>
      </section>

      <section className="content-section">
        <div className="content-wrapper">
          <h2>Mission & Vision</h2>
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Mission</h3>
              <p>To provide accessible, enterprise-grade security and connected solutions to organizations of all sizes.</p>
            </div>
            <div className="mv-card">
              <h3>Vision</h3>
              <p>Enable a safer, more connected world through thoughtful engineering and strong fundamentals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
