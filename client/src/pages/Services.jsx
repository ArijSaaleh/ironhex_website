import React, { useEffect } from 'react'

const cybersecurity = [
  { id: 1, title: 'Managed Cybersecurity', description: 'Threat detection, continuous monitoring, and incident response.' },
  { id: 2, title: 'Penetration Testing', description: 'Simulated attacks to uncover vulnerabilities.' },
  { id: 3, title: 'Security Architecture', description: 'Design secure systems and networks.' },
]

const iot = [
  { id: 4, title: 'IoT Device Integration', description: 'End-to-end IoT device onboarding and management.' },
  { id: 5, title: 'Edge Security', description: 'Secure communication and firmware management for edge devices.' },
  { id: 6, title: 'Custom IoT Solutions', description: 'Tailored platforms and data pipelines for connected products.' },
]

export default function Services(){
  useEffect(() => {
    // scroll to anchor if hash present
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1)
      const el = document.getElementById(id)
      if (el) {
        // slight delay to ensure layout finished
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      }
    }
  }, [])
  return (
    <div className="content-section">
      <div className="content-wrapper">
        <h2 id="cybersecurity">Cybersecurity Services</h2>
        <p>Proactive defenses to secure your infrastructure.</p>
        <div className="service-list" style={{paddingTop:10, marginBottom:30}}>
          {cybersecurity.map(s => (
            <div key={s.id} className="card" style={{marginBottom:16}}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <h2 id="iot">IoT Services</h2>
        <p>Secure and reliable IoT solutions.</p>
        <div className="service-list" style={{paddingTop:10}}>
          {iot.map(s => (
            <div key={s.id} className="card" style={{marginBottom:16}}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
