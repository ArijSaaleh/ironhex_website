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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact Info & Enhanced Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.getInTouch')}</h3>
            
            {/* Email */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-gray-300 font-medium text-sm">{t('footer.email')}</p>
                <a href="mailto:contact@ironhex-tech.com" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  contact@ironhex-tech.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-gray-300 font-medium text-sm">{t('footer.phone')}</p>
                <a href="tel:+21670123456" className="text-gray-400 hover:text-primary transition-colors text-sm">
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

            {/* Enhanced Map - Larger */}
            <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl hover:border-primary transition-colors">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25689.89843729843!2d10.188088!3d36.74516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34e10b1c6c0f%3A0x8b8e1e8e1e8e1e8e!2sMegrine%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IRONHEX Location - Megrine, Ben Arous, Tunisia"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.contactUs')}</h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Bottom Links & Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            <Link 
              to="/regulations" 
              onClick={scrollToTop}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {t('nav.regulations')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/faq" 
              onClick={scrollToTop}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {t('nav.faq')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/terms" 
              onClick={scrollToTop}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {t('nav.terms')}
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/privacy" 
              onClick={scrollToTop}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {t('nav.privacy')}
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}


