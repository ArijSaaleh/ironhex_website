import { Link } from 'react-router-dom'
import Typewriter from '../components/Typewriter'
// Contact form moved to footer per design
export default function Home(){
  return (
    <main className="pt-16">
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900">
        <div className="absolute inset-0 bg-[url('/hero.png')] bg-center bg-cover filter blur-sm brightness-50"></div>
        {/**<div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-black/25"></div>*/}
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            <Typewriter text={"Unbreakable Security for an Interconnected World"} speed={90} />
          </h1>
          <p className="mt-4 text-lg text-white/90">Protecting your business with advanced cybersecurity and intelligent IOT solutions</p>
          <div className="mt-6">
            <a href="#" className="inline-block bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-md mr-3 transition-colors">
              Get a Free Security Assessment
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cybersecurity Services</h3>
              <p className="text-gray-600 mb-4">Proactive defense against evolving digital threats</p>
              <Link to="/services/cybersecurity" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cog text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">IoT Services</h3>
              <p className="text-gray-600 mb-4">Secure and seamless integration of smart devices</p>
              <Link to="/services/iot" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Managed Security & Support</h3>
              <p className="text-gray-600 mb-4">24/7 monitoring, rapid response, and expert guidance</p>
              <a href="#" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What clients say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-4">"IRONHEX secured our IoT rollout and improved monitoring — their team is top notch."</p>
              <strong className="text-gray-900">- CTO, Acme Corp</strong>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-700 mb-4">"Response times and the expertise are exceptional. Recommended."</p>
              <strong className="text-gray-900">- Head of IT, Beta Ltd</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our partners</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img src="https://www.ooredoo.com/wp-content/uploads/2015/12/Ooredoo-Logo_CMYK_On-White-BG_FA-01.png" 
                 alt="Partner 1" 
                 className="h-10 opacity-90" />
            <img src="https://www.wikiberal.org/images/c/c3/Logo_Google.png" 
                 alt="Partner 2" 
                 className="h-10 opacity-90" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LoRaWAN_Logo.svg/2560px-LoRaWAN_Logo.svg.png" 
                 alt="Partner 3" 
                 className="h-10 opacity-90" />
          </div>
        </div>
      </section>
    </main>
  )
}
