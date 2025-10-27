import React from 'react'
import { Link } from 'react-router-dom'

export default function Services(){
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="mt-4 text-lg text-gray-700">We specialise in Cybersecurity and IoT solutions tailored to your needs. Select a service area below to learn more.</p>

        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6 text-left">
            <div className="w-14 h-14 rounded-full bg-green-50 text-primary flex items-center justify-center text-2xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold">Cybersecurity Services</h3>
            <p className="mt-2 text-gray-600">Proactive defenses, managed security, and compliance guidance.</p>
            <Link to="/services/cybersecurity" className="inline-block mt-4 text-primary font-semibold">Explore Cybersecurity</Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-left">
            <div className="w-14 h-14 rounded-full bg-green-50 text-primary flex items-center justify-center text-2xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold">IoT Services</h3>
            <p className="mt-2 text-gray-600">Secure device integration, edge computing, and analytics.</p>
            <Link to="/services/iot" className="inline-block mt-4 text-primary font-semibold">Explore IoT</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
