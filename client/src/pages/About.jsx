import React from 'react'

export default function About(){
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-green text-3xl font-bold">About IRONHEX</h1>
          <h2 className="text-2xl font-semibold mt-2">Securing Tomorrow, Today</h2>
          <p className="mt-4 text-gray-700">Founded on expertise, driven by innovation, and committed to a secure digital future.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">Our Story: Born from Vision and Expertise</h2>
          <p className="mt-4 text-gray-700">IRONHEX was founded in <strong>Tunisia in 2025</strong> by two visionary female engineers, each bringing a unique and powerful skillset to the burgeoning fields of cybersecurity and the Internet of Things (IoT). Their shared passion for innovation and an unwavering commitment to digital security laid the groundwork for a company designed to protect and empower businesses in an increasingly connected world.</p>
          <p className="mt-2 text-gray-700">Recognizing the critical intersection of robust security and seamless IoT integration, they set out to create solutions that not only safeguard digital assets but also unlock new possibilities through intelligent, connected technologies.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-green text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-3 text-gray-700">To provide cutting-edge cybersecurity and intelligent IoT solutions that empower businesses to thrive securely in a complex digital landscape, fostering innovation while ensuring data integrity and privacy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-green text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-3 text-gray-700">To be the leading trusted partner in digital security and IoT innovation across Tunisia and beyond, shaping a future where technology is both powerful and inherently safe for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">Meet Our Founders</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-left">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-200">
                <img src="https://img.freepik.com/premium-photo/3d-character-muslim-hijab-girl-cute-smile_796323-731.jpg?semt=ais_hybrid&w=740&q=80" alt="CISO Image" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-center">Imen Chihi</h3>
              <p className="text-center text-sm text-primary font-semibold">Co-Founder & CISO</p>
              <p className="mt-3 text-gray-700">A brilliant mind in cybersecurity, Imen leads IRONHEX's defense strategies, ensuring our clients and their assets are protected against the most sophisticated digital threats. Her expertise spans threat intelligence, incident response, and secure architecture design.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-left">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-200">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQG3KVSzLBXgdw/profile-displayphoto-scale_400_400/B4DZl8u2zFIgAg-/0/1758734284869?e=1762387200&v=beta&t=dHRhQETEkh8iOO77LWGY8VvG9q8lmseYQl6qQrAMeMk" alt="CTO Image" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-center">Arij Saleh</h3>
              <p className="text-center text-sm text-primary font-semibold">Co-Founder & CTO</p>
              <p className="mt-3 text-gray-700">Arij is the driving force behind IRONHEX's innovative IoT solutions. With a deep understanding of connected ecosystems, she architects smart, efficient, and scalable IoT deployments that transform businesses and industries.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">Join Our Journey</h2>
          <p className="mt-4 text-gray-700">We are always looking for passionate talent to join our growing team. Explore career opportunities or get in touch to learn more about how we can help secure your digital world.</p>
          <a href="#contact-us-footer" className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-md">Contact Us</a>
        </div>
      </section>
    </div>
  )
}
