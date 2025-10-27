import { Link } from 'react-router-dom'
import Typewriter from '../components/Typewriter'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home(){
  const { t } = useLanguage()
  
  return (
    <main className="pt-16">
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900 dark:bg-gray-950">
        <div className="absolute inset-0 bg-[url('/hero.png')] bg-center bg-cover filter blur-sm brightness-50 dark:brightness-40"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            <Typewriter text={t('home.hero.title')} speed={90} />
          </h1>
          <p className="mt-4 text-lg text-white/90">{t('home.hero.description')}</p>
          <div className="mt-6">
            <a href="#contact-us-footer" className="inline-block bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-md mr-3 transition-colors">
              {t('home.hero.cta')}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('home.services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('home.services.cyber.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('home.services.cyber.desc')}</p>
              <Link to="/services/cybersecurity" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                {t('common.learnMore')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cog text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('home.services.iot.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('home.services.iot.desc')}</p>
              <Link to="/services/iot" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                {t('common.learnMore')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t('home.services.managed.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('home.services.managed.desc')}</p>
              <a href="#contact-us-footer" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center">
                {t('common.learnMore')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('home.testimonials.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('home.testimonials.1')}</p>
              <strong className="text-gray-900 dark:text-white">{t('home.testimonials.1.author')}</strong>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('home.testimonials.2')}</p>
              <strong className="text-gray-900 dark:text-white">{t('home.testimonials.2.author')}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">{t('home.partners.title')}</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img src="https://www.ooredoo.com/wp-content/uploads/2015/12/Ooredoo-Logo_CMYK_On-White-BG_FA-01.png" 
                 alt="Partner 1" 
                 className="h-10 opacity-90 dark:opacity-75" />
            <img src="https://www.wikiberal.org/images/c/c3/Logo_Google.png" 
                 alt="Partner 2" 
                 className="h-10 opacity-90 dark:opacity-75" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LoRaWAN_Logo.svg/2560px-LoRaWAN_Logo.svg.png" 
                 alt="Partner 3" 
                 className="h-10 opacity-90 dark:opacity-75" />
          </div>
        </div>
      </section>
    </main>
  )
}
