import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

export default function TermsOfService() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={`${t('terms.title')} - IRONHEX`}
        description="Terms and conditions for using IRONHEX services and website"
        keywords="terms of service, legal, terms and conditions, IRONHEX"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Header */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('terms.lastUpdated')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            {/* Introduction */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.intro')}
              </p>
            </div>

            {/* 1. Acceptance of Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.acceptance.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.acceptance.content')}
              </p>
            </div>

            {/* 2. Services Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.services.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.services.content')}
              </p>
            </div>

            {/* 3. User Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.responsibilities.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('terms.responsibilities.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.responsibilities.1')}</li>
                  <li>{t('terms.responsibilities.2')}</li>
                  <li>{t('terms.responsibilities.3')}</li>
                  <li>{t('terms.responsibilities.4')}</li>
                  <li>{t('terms.responsibilities.5')}</li>
                  <li>{t('terms.responsibilities.6')}</li>
                  <li>{t('terms.responsibilities.7')}</li>
                </ul>
              </div>
            </div>

            {/* 4. Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.ip.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.ip.content')}
              </p>
            </div>

            {/* 5. Service Availability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.availability.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.availability.content')}
              </p>
            </div>

            {/* 6. Confidentiality */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.confidentiality.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('terms.confidentiality.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.confidentiality.1')}</li>
                  <li>{t('terms.confidentiality.2')}</li>
                  <li>{t('terms.confidentiality.3')}</li>
                  <li>{t('terms.confidentiality.4')}</li>
                </ul>
              </div>
            </div>

            {/* 7. Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.liability.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.liability.content')}
              </p>
            </div>

            {/* 8. Indemnification */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.indemnification.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('terms.indemnification.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('terms.indemnification.1')}</li>
                  <li>{t('terms.indemnification.2')}</li>
                  <li>{t('terms.indemnification.3')}</li>
                  <li>{t('terms.indemnification.4')}</li>
                </ul>
              </div>
            </div>

            {/* 9. Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.governing.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.governing.content')}
              </p>
            </div>

            {/* 10. Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.payment.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.payment.content')}
              </p>
            </div>

            {/* 11. Termination */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.termination.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.termination.content')}
              </p>
            </div>

            {/* 12. Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.changes.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('terms.changes.content')}
              </p>
            </div>

            {/* 13. Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('terms.contact.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('terms.contact.content')}</p>
                <div className="space-y-2">
                  <p>{t('terms.contact.email')}</p>
                  <p>{t('terms.contact.phone')}</p>
                  <p>{t('terms.contact.address')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
