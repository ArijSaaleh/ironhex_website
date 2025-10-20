import React from 'react'
// Contact form moved to footer per design
import ContactForm from '../components/ContactForm'
export default function Home(){
  return (
    <main>
      <section className="page-hero-section">
        <div className="page-hero-background-overlay"></div>
        <div className="page-hero-content">
          <h1 className="hero-animated">Secure your digital future with IRONHEX</h1>
          <p>Expert cybersecurity and IoT solutions for modern businesses.</p>
          <div style={{marginTop:18}}>
            <a href="/services#cybersecurity" className="btn-primary" style={{marginRight:10}}>Cybersecurity</a>
            <a href="/services#iot" className="btn-secondary">IoT Services</a>
          </div>
        </div>
      </section>

    

      <section className="content-section">
        <div className="content-wrapper">
          <h2>What clients say</h2>
          <div className="service-cards">
            <div className="card">
              <p>"IRONHEX secured our IoT rollout and improved monitoring — their team is top notch."</p>
              <strong>- CTO, Acme Corp</strong>
            </div>
            <div className="card">
              <p>"Response times and the expertise are exceptional. Recommended."</p>
              <strong>- Head of IT, Beta Ltd</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section bg-light">
        <div className="content-wrapper">
          <h2>Our partners</h2>
          <div style={{display:'flex',gap:20,alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
            <img src="/partner1.png" alt="Partner 1" style={{height:40,opacity:0.9}} />
            <img src="/partner2.png" alt="Partner 2" style={{height:40,opacity:0.9}} />
            <img src="/partner3.png" alt="Partner 3" style={{height:40,opacity:0.9}} />
          </div>
        </div>
      </section>
    </main>
  )
}
