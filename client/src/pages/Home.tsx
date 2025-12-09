import { Link } from 'react-router-dom'
import Typewriter from '../components/Typewriter'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import CounterAnimation from '../components/CounterAnimation'
import CustomCursor from '../components/CustomCursor'

export default function Home(){
  const { t } = useLanguage()
  
  return (
    <>
      <SEO 
        title={t('home.hero.title')}
        description={t('home.hero.description')}
        keywords="cybersecurity, IoT, security services, Tunisia, IRONHEX"
        url="/"
      />
      <CustomCursor />
      <div className="bg-white dark:bg-gray-900 transition-colors cursor-none">
      <main className="pt-16">
      {/* Hero Section - IoT Product Focused */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold">
              <i className="fas fa-shield-alt"></i>
              <span>Enterprise-Grade Security Solutions</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              <span className="block mb-4">
                <Typewriter text={t('home.hero.title')} speed={90} />
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-primary">
                Cybersecurity & IoT
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('home.hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact-us-footer" 
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
              >
                <i className="fas fa-rocket"></i>
                {t('home.hero.cta')}
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 dark:border-gray-600 hover:border-primary transition-all hover:scale-105 shadow-lg"
              >
                <i className="fas fa-info-circle"></i>
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-shield-virus text-primary text-xl"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">Threat Detection</p>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">AI-Powered</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-microchip text-cyan-600 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">IoT Security</p>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">End-to-End</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - IoT Products Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main IoT Products Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200" 
                  alt="IoT Smart Home Devices" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                
                {/* Floating Security Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="fas fa-lock text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Secured by IRONHEX</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">24/7 Protection & Monitoring</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating IoT Device Cards */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-plug text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Smart Plug</p>
                    <span className="text-green-600 text-xs flex items-center gap-1">
                      <i className="fas fa-check-circle"></i> Protected
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <i className="fas fa-camera text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Smart Camera</p>
                    <span className="text-green-600 text-xs flex items-center gap-1">
                      <i className="fas fa-check-circle"></i> Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Modern Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Organizations Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat Card 1 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-project-diagram text-primary text-2xl"></i>
                </div>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                  <CounterAnimation end={15} suffix="+" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  Projects Secured & Delivered
                </p>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-smile text-primary text-2xl"></i>
                </div>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                  <CounterAnimation end={99} suffix="%" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  Client Satisfaction
                </p>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-clock text-primary text-2xl"></i>
                </div>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                  <CounterAnimation end={24} suffix="/7" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  Security Monitoring
                </p>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fas fa-microchip text-primary text-2xl"></i>
                </div>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                  <CounterAnimation end={50} suffix="+" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  IoT Devices Protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Premium Cards */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive security solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 - Cybersecurity */}
            <Link to="/services/cybersecurity" className="group">
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-shield-alt text-white text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('home.services.cyber.title')}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.services.cyber.desc')}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                    {t('common.learnMore')}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Service Card 2 - IoT */}
            <Link to="/services/iot" className="group">
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-cog text-white text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('home.services.iot.title')}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {t('home.services.iot.desc')}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                    {t('common.learnMore')}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Service Card 3 - Web Development & SaaS Solutions */}
            <Link to="/services/software" className="group">
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-code text-white text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Web Development & SaaS
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Custom web applications and SaaS solutions built with modern technologies for scalability and performance.
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                    {t('common.learnMore')}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Client Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              {t('home.testimonials.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{t('home.testimonials.1')}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t('home.testimonials.1.author').charAt(0)}
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white font-bold block">
                      {t('home.testimonials.1.author')}
                    </strong>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Verified Client</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{t('home.testimonials.2')}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t('home.testimonials.2.author').charAt(0)}
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white font-bold block">
                      {t('home.testimonials.2.author')}
                    </strong>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Verified Client</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Premium Grid */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Trusted Partners</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              {t('home.partners.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src="EagleDefenderss.png" 
                   alt="Eagle Defenders Partner" 
                   className="relative z-10 h-24 w-auto transition-all duration-300" />
            </div>
            
            <div className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src="https://www.wikiberal.org/images/c/c3/Logo_Google.png" 
                   alt="Google Partner" 
                   className="relative z-10 h-12 w-auto transition-all duration-300" />
            </div>
            
            <div className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LoRaWAN_Logo.svg/2560px-LoRaWAN_Logo.svg.png" 
                   alt="LoRaWAN Partner" 
                   className="relative z-10 h-12 w-auto transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
    </>
  )
}
