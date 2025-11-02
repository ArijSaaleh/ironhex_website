import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import Typewriter from '../components/Typewriter'
import CustomCursor from '../components/CustomCursor'

export default function About(){
  const { t } = useLanguage()
  
  return (
    <>
      <CustomCursor />
      <SEO
        title={t('about.title')}
        description={t('about.intro')}
        keywords="IronHex, cybersecurity company, Tunisia, about us, mission, vision, founders"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors cursor-none">
      {/* Hero Section - Light & Professional */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-20">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold">
              <i className="fas fa-users"></i>
              <span>Cybersecurity Experts Since 2020</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight">
              <Typewriter text={t('about.title')} speed={90} />
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              {t('about.subtitle')}
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('about.intro')}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-black text-primary mb-1">15+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Projects</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-black text-primary mb-1">99%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-black text-primary mb-1">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="IronHex Team" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <i className="fas fa-award text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Award-Winning Team</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Certified Security Professionals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Certification Cards */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-certificate text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">ISO Certified</p>
                  <span className="text-green-600 text-xs flex items-center gap-1">
                    <i className="fas fa-check-circle"></i> Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-shield-alt text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">CISSP Team</p>
                  <span className="text-green-600 text-xs flex items-center gap-1">
                    <i className="fas fa-check-circle"></i> Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Enhanced */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-book-open text-white text-3xl"></i>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('about.story.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">{t('about.story.p1')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              Mission & Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fas fa-bullseye text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('about.mission.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center text-lg">{t('about.mission.desc')}</p>
              </div>
            </div>

            <div className="group relative bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fas fa-eye text-white text-3xl"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('about.vision.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center text-lg">{t('about.vision.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section - Premium Design */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Meet the Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
              {t('about.founders.title')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-10">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-primary/20 group-hover:border-primary/50 transition-all shadow-lg group-hover:shadow-xl group-hover:scale-105 transform duration-300">
                  <img src="imen.png" alt="CISO Image" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('about.founder1.name')}</h3>
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                    <p className="text-sm text-primary font-semibold">{t('about.founder1.role')}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">{t('about.founder1.desc')}</p>
              </div>
            </div>
            
            <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-10">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-blue-500/20 group-hover:border-blue-500/50 transition-all shadow-lg group-hover:shadow-xl group-hover:scale-105 transform duration-300">
                  <img src="https://media.licdn.com/dms/image/v2/D4D03AQG3KVSzLBXgdw/profile-displayphoto-scale_400_400/B4DZl8u2zFIgAg-/0/1758734284869?e=1762387200&v=beta&t=dHRhQETEkh8iOO77LWGY8VvG9q8lmseYQl6qQrAMeMk" alt="CTO Image" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('about.founder2.name')}</h3>
                  <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{t('about.founder2.role')}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">{t('about.founder2.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Journey CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-gradient-to-br from-primary via-emerald-600 to-primary rounded-3xl shadow-2xl overflow-hidden p-12">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <i className="fas fa-handshake"></i>
                Ready to Get Started?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('about.journey.title')}</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('about.journey.desc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#contact-us-footer"
                  className="group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <i className="fas fa-envelope"></i>
                  {t('about.journey.cta')}
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
