import React from 'react'
import Typewriter from '../components/Typewriter'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import CustomCursor from '../components/CustomCursor'

export default function IoT(){
  const { t } = useLanguage()
  
  return (
    <>
      <CustomCursor />
      <SEO
        title={t('iot.hero.title')}
        description={t('iot.hero.desc')}
        keywords="IoT security, Internet of Things, smart devices security, Tunisia, IronHex IoT"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors cursor-none">
      {/* Hero Section - Modern Light Design */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-20">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-semibold">
              <i className="fas fa-wifi"></i>
              <span>Smart IoT Security Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight">
              <Typewriter text={t('iot.hero.title')} speed={90} />
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('iot.hero.desc')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#iot-features" 
                 className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold hover:shadow-2xl hover:shadow-primary/50 transition-all hover:-translate-y-1">
                {t('iot.hero.features')}
                <i className="fas fa-arrow-down group-hover:translate-y-1 transition-transform"></i>
              </a>
              <a href="#contact-us-footer" 
                 className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 font-semibold hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
                {t('iot.hero.consultation')}
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <i className="fas fa-microchip text-primary text-xl"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">IoT Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <i className="fas fa-network-wired text-primary text-xl"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">LoRaWAN Experts</span>
              </div>
            </div>
          </div>

          {/* Right Content - IoT Devices Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=500&fit=crop" 
                alt="IoT Security"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-plug text-white text-xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Smart Devices</p>
                      <p className="text-sm text-gray-600">Fully Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-network-wired text-blue-500"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connected Devices</p>
                  <p className="font-bold text-gray-900 dark:text-white">5,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t('iot.intro.title')}
          </h2>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
            <p>
              {t('iot.intro.p1')}
            </p>
            <p>
              {t('iot.intro.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="iot-features" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">IoT Solutions</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              {t('iot.services.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Secure your smart devices with our comprehensive IoT security platform
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t('iot.service1.title'),
                desc: t('iot.service1.desc'),
                icon: 'fa-microchip',
                color: 'blue-500'
              },
              {
                title: t('iot.service2.title'),
                desc: t('iot.service2.desc'),
                icon: 'fa-wifi',
                color: 'primary'
              },
              {
                title: t('iot.service3.title'),
                desc: t('iot.service3.desc'),
                icon: 'fa-cloud',
                color: 'cyan-500'
              },
              {
                title: t('iot.service4.title'),
                desc: t('iot.service4.desc'),
                icon: 'fa-bell',
                color: 'orange-500'
              },
              {
                title: t('iot.service5.title'),
                desc: t('iot.service5.desc'),
                icon: 'fa-chart-line',
                color: 'purple-500'
              },
              {
                title: t('iot.service6.title'),
                desc: t('iot.service6.desc'),
                icon: 'fa-plug',
                color: 'primary'
              },
            ].map(({ title, desc, icon, color }) => (
              <div key={title} 
                   className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${color} to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{desc}</p>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <a href="#contact-us-footer" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                      Learn More
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

