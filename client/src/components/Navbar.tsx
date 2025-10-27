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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="IRONHEX Logo" className="h-12 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" onClick={closeMenus} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/about" onClick={closeMenus} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">
            {t('nav.about')}
          </Link>
          
          {/* Desktop Services Dropdown */}
          <div className="relative"
               onMouseEnter={() => setServicesOpen(true)}
               onMouseLeave={() => setServicesOpen(false)}>
            <button className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold transition-colors">
              {t('nav.services')} <span className="ml-1">▾</span>
            </button>
            {/* Added padding to prevent mouse gap */}
            <div className={`absolute left-0 pt-2 ${servicesOpen ? 'block' : 'hidden'}`}>
              <ul className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg py-2 w-48">
                <li className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link to="/services/cybersecurity"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    {t('nav.cybersecurity')}
                  </Link>
                </li>
                <li className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link to="/services/iot"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    {t('nav.iot')}
                  </Link>
                </li>
                <li className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link to="/services/software"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        onClick={closeMenus}>
                    {t('nav.software')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <a href="#contact-us-footer" 
             className="px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors font-semibold">
            {t('nav.contact')}
          </a>

          {/* Theme and Language Controls */}
          <div className="flex items-center gap-2 border-l dark:border-gray-700 pl-4">
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
      <div className={`md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-all duration-300 ease-in-out ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="px-6 py-4 space-y-4">
          <Link to="/" 
                onClick={closeMenus}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold">
            {t('nav.home')}
          </Link>
          <Link to="/about"
                onClick={closeMenus}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold">
            {t('nav.about')}
          </Link>
          <div className="py-2">
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('nav.services')}</div>
            <Link to="/services/cybersecurity"
                  onClick={closeMenus}
                  className="block pl-4 py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              {t('nav.cybersecurity')}
            </Link>
            <Link to="/services/iot"
                  onClick={closeMenus}
                  className="block pl-4 py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              {t('nav.iot')}
            </Link>
            <Link to="/services/software"
                  onClick={closeMenus}
                  className="block pl-4 py-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              {t('nav.software')}
            </Link>
          </div>
          <a href="#contact-us-footer"
             onClick={closeMenus}
             className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-semibold">
            {t('nav.contact')}
          </a>
        </nav>
      </div>
    </header>
  )
}
