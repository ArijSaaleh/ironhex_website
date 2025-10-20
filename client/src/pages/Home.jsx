import React from 'react'
// Contact form moved to footer per design
import ContactForm from '../components/ContactForm'
export default function Home(){
  return (
    <main>
      <section className="page-hero-section">
        <div className="page-hero-background-overlay"></div>
        <div className="page-hero-content">
          <h1 className="hero-animated">Unbreakable Security for an Interconected World</h1>
          <p>Protecting your business with advanced cybersecurity and intelligent IOT solutions</p>
          <div style={{marginTop:18}}>
            <a href="#" className="btn-primary" style={{marginRight:10}}>Get a Free Security Assessment</a>
          </div>
        </div>
        <div class="hero-background-overlay"></div>
            <div class="hero-background-image"></div>
      </section>

      <section class="core-services">
            <h2>Our Core Services</h2>
            <div class="service-cards">
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Cybersecurity Services</h3>
                    <p>Proactive defense against evolving digital threats</p>
                    <a href="cybersecurity-services.html" class="learn-more-link">Learn More</a>
                </div>
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-cog"></i>
                    </div>
                    <h3>IOT Services</h3>
                    <p>Secure and seamless integration of smart devices</p>
                    <a href="iot-services.html" class="learn-more-link">Learn More</a>
                </div>
                <div class="card">
                    <div class="icon-wrapper">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3>Managed Security & Support</h3>
                    <p>24/7 monitoring, rapid response, and expert guidance</p>
                    <a href="#" class="learn-more-link">Learn More</a>
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
            <img src="https://www.ooredoo.com/wp-content/uploads/2015/12/Ooredoo-Logo_CMYK_On-White-BG_FA-01.png" alt="Partner 1" style={{height:40,opacity:0.9}} />
            <img src="https://www.wikiberal.org/images/c/c3/Logo_Google.png" alt="Partner 2" style={{height:40,opacity:0.9}} />
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LoRaWAN_Logo.svg/2560px-LoRaWAN_Logo.svg.png" alt="Partner 3" style={{height:40,opacity:0.9}} /> 
          </div>
        </div>
      </section>
    </main>
  )
}
