import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { t } = useLanguage()

  const closeMenus = () => {
    setOpen(false)
    setServicesOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="IRONHEX Logo" className="h-10 object-contain group-hover:scale-105 transition-transform" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" onClick={closeMenus} className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors group">
            {t('nav.home')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" onClick={closeMenus} className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors group">
            {t('nav.about')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          {/* Desktop Services Dropdown */}
          <div className="relative"
               onMouseEnter={() => setServicesOpen(true)}
               onMouseLeave={() => setServicesOpen(false)}>
            <button className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors flex items-center gap-1 group">
              {t('nav.services')}
              <i className={`fas fa-chevron-down text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`}></i>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
            {/* Added padding to prevent mouse gap */}
            <div className={`absolute left-0 pt-3 transition-all duration-300 ${servicesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <ul className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-3 w-64 overflow-hidden">
                <li className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                  <Link to="/services/cybersecurity"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors group"
                        onClick={closeMenus}>
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-shield-alt text-red-500"></i>
                    </div>
                    <div>
                      <div className="font-semibold">{t('nav.cybersecurity')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Security Solutions</div>
                    </div>
                  </Link>
                </li>
                <li className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                  <Link to="/services/iot"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors group"
                        onClick={closeMenus}>
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-wifi text-blue-500"></i>
                    </div>
                    <div>
                      <div className="font-semibold">{t('nav.iot')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Smart Devices</div>
                    </div>
                  </Link>
                </li>
                <li className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                  <Link to="/services/software"
                        className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors group"
                        onClick={closeMenus}>
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <i className="fas fa-laptop-code text-purple-500"></i>
                    </div>
                    <div>
                      <div className="font-semibold">{t('nav.software')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Ready Platforms</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <a href="#contact-us-footer" 
             className="px-6 py-2.5 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-0.5 flex items-center gap-2">
            <i className="fas fa-envelope"></i>
            {t('nav.contact')}
          </a>

          {/* Theme and Language Controls */}
          <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-6">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSelector />
          <button onClick={() => setOpen(!open)} 
                  className="p-2 rounded-md">
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-300 transform transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-300 transform transition-opacity ${open ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-300 transform transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="px-6 py-6 space-y-2">
          <Link to="/" 
                onClick={closeMenus}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
            <i className="fas fa-home w-5"></i>
            {t('nav.home')}
          </Link>
          <Link to="/about"
                onClick={closeMenus}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
            <i className="fas fa-info-circle w-5"></i>
            {t('nav.about')}
          </Link>
          <div className="py-2">
            <div className="flex items-center gap-3 px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <i className="fas fa-briefcase w-5"></i>
              {t('nav.services')}
            </div>
            <Link to="/services/cybersecurity"
                  onClick={closeMenus}
                  className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
              <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-shield-alt text-red-500 text-sm"></i>
              </div>
              {t('nav.cybersecurity')}
            </Link>
            <Link to="/services/iot"
                  onClick={closeMenus}
                  className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-wifi text-blue-500 text-sm"></i>
              </div>
              {t('nav.iot')}
            </Link>
            <Link to="/services/software"
                  onClick={closeMenus}
                  className="flex items-center gap-3 pl-8 pr-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-primary/5 transition-all">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-laptop-code text-purple-500 text-sm"></i>
              </div>
              {t('nav.software')}
            </Link>
          </div>
          <a href="#contact-us-footer"
             onClick={closeMenus}
             className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all mt-4">
            <i className="fas fa-envelope"></i>
            {t('nav.contact')}
          </a>
        </nav>
      </div>
    </header>
  )
}
