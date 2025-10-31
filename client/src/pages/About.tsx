import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import Typewriter from '../components/Typewriter'

export default function About(){
  const { t } = useLanguage()
  
  return (
    <>
      <SEO
        title={t('about.title')}
        description={t('about.intro')}
        keywords="IronHex, cybersecurity company, Tunisia, about us, mission, vision, founders"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900 dark:bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-gray-900/20 dark:from-green-900/95 dark:to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            <Typewriter text={t('about.title')} speed={90} />
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-200">{t('about.subtitle')}</h2>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{t('about.intro')}</p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.story.title')}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('about.story.p1')}</p>
          
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600">
              <div className="text-green text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('about.mission.title')}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{t('about.mission.desc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600">
              <div className="text-green text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('about.vision.title')}</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{t('about.vision.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.founders.title')}</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 text-left">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-200 dark:border-primary/40">
                <img src="imen.png" alt="CISO Image" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">{t('about.founder1.name')}</h3>
              <p className="text-center text-sm text-primary font-semibold">{t('about.founder1.role')}</p>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{t('about.founder1.desc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600 text-left">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-200 dark:border-primary/40">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQG3KVSzLBXgdw/profile-displayphoto-scale_400_400/B4DZl8u2zFIgAg-/0/1758734284869?e=1762387200&v=beta&t=dHRhQETEkh8iOO77LWGY8VvG9q8lmseYQl6qQrAMeMk" alt="CTO Image" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">{t('about.founder2.name')}</h3>
              <p className="text-center text-sm text-primary font-semibold">{t('about.founder2.role')}</p>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{t('about.founder2.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Journey CTA */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary/90 dark:to-blue-700 text-white rounded-xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.journey.title')}</h2>
            <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl mx-auto">{t('about.journey.desc')}</p>
            <a 
              href="#contact-us-footer" 
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
            >
              {t('about.journey.cta')}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
