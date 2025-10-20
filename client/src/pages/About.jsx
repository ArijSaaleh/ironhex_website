import React from 'react'

export default function About(){
  return (
    <div>
      <section className="page-header content-section">
        <div className="content-wrapper text-center">
          <h1 className="text-green">About IRONHEX</h1><h1>Securing Tomorrow, Today</h1>
          <p className="lead">Founded on expertise, driven by innovation, and committed to a secure digital future.</p>
        </div>
      </section>

      <section className="about-intro content-section bg-light">
        <div className="content-wrapper text-center">
          <h2>Our Story: Born from Vision and Expertise</h2>
          <p>IRONHEX was founded in <strong>Tunisia in 2025</strong> by two visionary female engineers, each bringing a unique and powerful skillset to the burgeoning fields of cybersecurity and the Internet of Things (IoT). Their shared passion for innovation and an unwavering commitment to digital security laid the groundwork for a company designed to protect and empower businesses in an increasingly connected world.</p>
          <p>Recognizing the critical intersection of robust security and seamless IoT integration, they set out to create solutions that not only safeguard digital assets but also unlock new possibilities through intelligent, connected technologies.</p>
        </div>
      </section>

      <section className="mission-vision content-section">
        <div className="content-wrapper">
          <div className="mv-grid">
            <div className="mv-card">
              <i className="fas fa-bullseye fa-3x text-green mb-4"></i>
              <h3>Our Mission</h3>
              <p>To provide cutting-edge cybersecurity and intelligent IoT solutions that empower businesses to thrive securely in a complex digital landscape, fostering innovation while ensuring data integrity and privacy.</p>
            </div>
            <div className="mv-card">
              <i className="fas fa-eye fa-3x text-green mb-4"></i>
              <h3>Our Vision</h3>
              <p>To be the leading trusted partner in digital security and IoT innovation across Tunisia and beyond, shaping a future where technology is both powerful and inherently safe for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership content-section bg-light">
        <div className="content-wrapper text-center">
          <h2>Meet Our Founders</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image-circle">
                <img src="https://i.imgur.com/your-ciso-image.jpg" alt="CISO Image" className="profile-img" />
              </div>
              <h3>Imen Chihi</h3>
              <p className="title">Co-Founder & CISO (Chief Information Security Officer)</p>
              <p>A brilliant mind in cybersecurity, Imen leads IRONHEX's defense strategies, ensuring our clients and their assets are protected against the most sophisticated digital threats. Her expertise spans threat intelligence, incident response, and secure architecture design.</p>
            </div>
            <div className="team-member">
              <div className="member-image-circle">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQG3KVSzLBXgdw/profile-displayphoto-scale_400_400/B4DZl8u2zFIgAg-/0/1758734284869?e=1762387200&v=beta&t=dHRhQETEkh8iOO77LWGY8VvG9q8lmseYQl6qQrAMeMk" alt="CTO Image" className="profile-img" /> 
              </div>
              <h3>Arij Saleh</h3>
              <p className="title">Co-Founder & CTO (Chief Technology Officer)</p>
              <p>Arij is the driving force behind IRONHEX's innovative IoT solutions. With a deep understanding of connected ecosystems, she architects smart, efficient, and scalable IoT deployments that transform businesses and industries.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta content-section">
        <div className="content-wrapper text-center">
          <h2>Join Our Journey</h2>
          <p>We are always looking for passionate talent to join our growing team. Explore career opportunities or get in touch to learn more about how we can help secure your digital world.</p>
          <a href="#contact-us-footer" className="btn-primary large-btn">Contact Us</a>
        </div>
      </section>
    </div>
  )
}
