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
    <footer id="contact-us-footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block group">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-28 w-auto object-contain group-hover:scale-105 transition-transform" />
            </Link>
            <p className="text-gray-300 leading-relaxed text-base">
              {t('footer.description')}
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4 pt-4">
              <a href="https://www.linkedin.com/company/ironhex-tn" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/ironhex_tech" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                <i className="fab fa-twitter"></i>
              </a>
             {/** <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                <i className="fab fa-instagram"></i>
              </a>*/}
            </div>
          </div>

          {/* Contact Info & Enhanced Map */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-primary"></i>
              {t('footer.getInTouch')}
            </h3>
            
            {/* Email */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i className="fas fa-envelope text-primary text-lg"></i>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">{t('footer.email')}</p>
                <a href="mailto:contact@ironhex-tech.com" className="text-gray-300 hover:text-primary transition-colors">
                  contact@ironhex-tech.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i className="fas fa-phone text-primary text-lg"></i>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">{t('footer.phone')}</p>
                <a href="tel:+21670123456" className="text-gray-300 hover:text-primary transition-colors">
                  +216 26 290 351
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <i className="fas fa-map-marker-alt text-primary text-lg"></i>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">{t('footer.address')}</p>
                <p className="text-gray-300">
                  {t('footer.location')}<br />
                  {t('footer.country')}
                </p>
              </div>
            </div>

            {/* Enhanced Map - Larger */}
            <div className="mt-6 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl hover:border-primary transition-all hover:shadow-primary/20">
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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <i className="fas fa-paper-plane text-primary"></i>
              {t('footer.contactUs')}
            </h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary/30 transition-all">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Links & Copyright */}
      <div className="relative z-10 border-t border-gray-700/50 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            <Link 
              to="/regulations" 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
            >
              <i className="fas fa-shield-alt text-primary group-hover:scale-110 transition-transform"></i>
              {t('nav.regulations')}
            </Link>
            <Link 
              to="/faq" 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
            >
              <i className="fas fa-question-circle text-primary group-hover:scale-110 transition-transform"></i>
              {t('nav.faq')}
            </Link>
            <Link 
              to="/terms" 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
            >
              <i className="fas fa-file-contract text-primary group-hover:scale-110 transition-transform"></i>
              {t('nav.terms')}
            </Link>
            <Link 
              to="/privacy" 
              onClick={scrollToTop}
              className="text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
            >
              <i className="fas fa-user-shield text-primary group-hover:scale-110 transition-transform"></i>
              {t('nav.privacy')}
            </Link>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-700/50"></div>
          
          {/* Copyright & Credits */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <i className="fas fa-copyright text-primary"></i>
              {new Date().getFullYear()} {t('footer.company')}. {t('footer.rights')}
            </p>
            
            
          </div>
        </div>
      </div>
    </footer>
  )
}


