import React from 'react'
import ContactForm from '../components/ContactForm'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer(){
  const { t } = useLanguage()
  
  return (
    <footer id="contact-us-footer" className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="block">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.getInTouch')}</h3>
            
            {/* Phone */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-gray-300 font-medium text-sm">{t('footer.phone')}</p>
                <a href="tel:+21670123456" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +216 70 123 456
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-gray-300 font-medium text-sm">{t('footer.address')}</p>
                <p className="text-gray-400 text-sm">
                  {t('footer.location')}<br />
                  {t('footer.country')}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25689.89843729843!2d10.188088!3d36.74516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34e10b1c6c0f%3A0x8b8e1e8e1e8e1e8e!2sMegrine%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IRONHEX Location - Megrine, Ben Arous, Tunisia"
              ></iframe>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li className="text-gray-300 text-sm font-medium">{t('footer.ourServices')}
                {/**<ul className="space-y-2 pl-4 mt-2">
                  <li>
                    <Link to="/services/cybersecurity" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {t('nav.cybersecurity')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/iot" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {t('nav.iot')}
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/software" onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {t('nav.software')}
                    </Link>
                  </li>
                </ul>*/}
              </li>
              <li>
                <Link to="/regulations" onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.regulations')}
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={scrollToTop} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.contactUs')}</h3>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}


