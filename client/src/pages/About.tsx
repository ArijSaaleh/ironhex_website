import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function About(){
  const { t } = useLanguage()
  
  return (
    <div className="mt-20">
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-green text-3xl font-bold dark:text-primary">{t('about.title')}</h1>
          <h2 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">{t('about.subtitle')}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('about.intro')}</p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.story.title')}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('about.story.p1')}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{t('about.story.p2')}</p>
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

      <section className="py-12 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('about.journey.title')}</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{t('about.journey.desc')}</p>
          <a href="#contact-us-footer" className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">{t('about.journey.cta')}</a>
        </div>
      </section>
    </div>
  )
}
