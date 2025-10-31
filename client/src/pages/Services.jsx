import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'

export default function Services(){
  const { t } = useLanguage()
  
  return (
    <>
      <SEO
        title={t('services.title')}
        description={t('services.subtitle')}
        keywords="cybersecurity services, IoT security, software development, Tunisia, IronHex services"
      />
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('services.title')}</h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{t('services.subtitle')}</p>

        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-primary/20 text-primary flex items-center justify-center text-2xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('services.cyber.title')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t('services.cyber.desc')}</p>
            <Link to="/services/cybersecurity" className="inline-block mt-4 text-primary font-semibold hover:text-primary-dark transition-colors">{t('services.cyber.cta')}</Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-primary/20 text-primary flex items-center justify-center text-2xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('services.iot.title')}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t('services.iot.desc')}</p>
            <Link to="/services/iot" className="inline-block mt-4 text-primary font-semibold hover:text-primary-dark transition-colors">{t('services.iot.cta')}</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
