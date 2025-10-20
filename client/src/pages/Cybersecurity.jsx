import React from 'react'

export default function Cybersecurity(){
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535223289827-42f1e9919769')] bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Fortify Your Digital Fortress
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
            IRONHEX provides comprehensive cybersecurity solutions to protect your business from evolving threats and ensure digital resilience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#cyber-offerings" 
               className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors duration-200">
              Our Offerings
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact-us-footer" 
               className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
              Request an Audit
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
            Proactive Defense in a Complex Digital Landscape
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              In today's interconnected world, cybersecurity is not just a necessity; it's the foundation of business continuity and trust. IRONHEX offers a full spectrum of cybersecurity services designed to identify, protect, detect, respond, and recover from cyber threats.
            </p>
            <p>
              We combine cutting-edge technology with expert human intelligence to build multi-layered defenses that safeguard your data, systems, and reputation against sophisticated attacks.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="cyber-offerings" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Cybersecurity Service Spectrum
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['Managed Security Services', '24/7 monitoring, threat detection, and rapid response by our Security Operations Center (SOC) experts.'],
              ['Vulnerability Management', 'Regular scanning, penetration testing, and risk assessments to identify and mitigate security weaknesses.'],
              ['Cloud Security', 'Secure your cloud infrastructure (AWS, Azure, GCP), applications, and data with robust controls.'],
              ['Endpoint Protection', 'Advanced protection for all devices, from laptops to servers, against malware, ransomware, and zero-day threats.'],
              ['Identity & Access Management (IAM)', 'Control who has access to what, ensuring secure authentication and authorization across your organization.'],
              ['Compliance & Governance', 'Navigate complex regulatory landscapes (GDPR, HIPAA, ISO 27001) with our expert guidance and solutions.'],
            ].map(([title, desc]) => (
              <div key={title} 
                   className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

