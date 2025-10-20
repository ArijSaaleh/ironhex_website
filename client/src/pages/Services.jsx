import React from 'react'

const services = [
  { id: 1, title: 'Managed Cybersecurity', description: 'Threat detection, continuous monitoring, and incident response.' },
  { id: 2, title: 'Penetration Testing', description: 'Simulated attacks to uncover vulnerabilities.' },
  { id: 3, title: 'Security Architecture', description: 'Design secure systems and networks.' },
  { id: 4, title: 'IoT Device Integration', description: 'End-to-end IoT device onboarding and management.' },
  { id: 5, title: 'Edge Security', description: 'Secure communication and firmware management for edge devices.' },
  { id: 6, title: 'Custom IoT Solutions', description: 'Tailored platforms and data pipelines for connected products.' },
]

export default function Services(){
  return (
    <div className="content-section">
      <div className="content-wrapper">
        <h2>Our Services</h2>
        <p>We combine cybersecurity expertise with IoT engineering to deliver practical solutions.</p>

        <div className="service-list" style={{maxHeight: '400px', overflowY: 'auto', paddingTop:20}}>
          {services.map(s => (
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
