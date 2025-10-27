import React from 'react'
import Typewriter from '../components/Typewriter'
export default function IoT(){
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://san.win.tue.nl/education/IoT-inf4all/figs/things.gif')] bg-center bg-cover"></div>
         { <div className="absolute inset-0 bg-gradient-to-r from-green-800/95 to-black/20"></div>} </div>
        <div className="relative z-10 mt-10 max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
           <Typewriter text={"Secure & Seamless IoT Integration"} speed={90} />
            
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
            Unlock the full potential of your connected devices with IRONHEX's intelligent IoT solutions, designed for security and efficiency.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#iot-features" 
               className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors duration-200">
              Explore Features
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact-us-footer" 
               className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Get a Consultation
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Transform Your Business with Smart IoT
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              The Internet of Things (IoT) is revolutionizing industries by connecting physical devices to the internet, enabling them to collect and exchange data. At IRONHEX, we empower your business to harness this power through secure, scalable, and intelligent IoT solutions.
            </p>
            <p>
              From smart infrastructure to industrial automation, our experts design, implement, and manage IoT ecosystems that drive efficiency, innovation, and growth while ensuring robust security from edge to cloud.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="iot-features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Comprehensive IoT Service Offerings
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['IoT Strategy & Consulting', 'Develop a clear IoT roadmap aligned with your business objectives, from device selection to platform integration.'],
              ['Secure IoT Device Management', 'Ensure the secure provisioning, monitoring, and updating of all your connected devices throughout their lifecycle.'],
              ['Cloud Integration & Data Analytics', 'Seamlessly connect your IoT devices to cloud platforms and derive actionable insights from collected data.'],
              ['IoT Security & Compliance', 'Implement multi-layered security protocols and ensure compliance with industry standards to protect your IoT ecosystem.'],
              ['Edge Computing Solutions', 'Process data closer to the source for real-time decision-making, reduced latency, and enhanced security.'],
              ['Industrial IoT (IIoT)', 'Optimize manufacturing, supply chain, and asset management with robust and secure IIoT implementations.'],
            ].map(([title, desc]) => (
              <div key={title} 
                   className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

