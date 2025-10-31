import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={`${t('privacy.title')} - IRONHEX`}
        description="IRONHEX privacy policy - How we collect, use, and protect your personal information"
        keywords="privacy policy, data protection, GDPR, personal information, IRONHEX"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Header */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('privacy.lastUpdated')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            {/* Introduction */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.intro')}
              </p>
            </div>

            {/* 1. Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.collection.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('privacy.collection.personal.title')}
                  </h3>
                  <p>{t('privacy.collection.personal.content')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('privacy.collection.automatic.title')}
                  </h3>
                  <p>{t('privacy.collection.automatic.content')}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('privacy.collection.technical.title')}
                  </h3>
                  <p>{t('privacy.collection.technical.content')}</p>
                </div>
              </div>
            </div>

            {/* 2. How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.usage.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('privacy.usage.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.usage.1')}</li>
                  <li>{t('privacy.usage.2')}</li>
                  <li>{t('privacy.usage.3')}</li>
                  <li>{t('privacy.usage.4')}</li>
                  <li>{t('privacy.usage.5')}</li>
                  <li>{t('privacy.usage.6')}</li>
                  <li>{t('privacy.usage.7')}</li>
                </ul>
              </div>
            </div>

            {/* 3. Information Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.sharing.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('privacy.sharing.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.sharing.1')}</li>
                  <li>{t('privacy.sharing.2')}</li>
                  <li>{t('privacy.sharing.3')}</li>
                  <li>{t('privacy.sharing.4')}</li>
                  <li>{t('privacy.sharing.5')}</li>
                </ul>
              </div>
            </div>

            {/* 4. Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.security.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('privacy.security.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.security.1')}</li>
                  <li>{t('privacy.security.2')}</li>
                  <li>{t('privacy.security.3')}</li>
                  <li>{t('privacy.security.4')}</li>
                  <li>{t('privacy.security.5')}</li>
                  <li>{t('privacy.security.6')}</li>
                </ul>
              </div>
            </div>

            {/* 5. Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.retention.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.retention.content')}
              </p>
            </div>

            {/* 6. Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.rights.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('privacy.rights.intro')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.rights.1')}</li>
                  <li>{t('privacy.rights.2')}</li>
                  <li>{t('privacy.rights.3')}</li>
                  <li>{t('privacy.rights.4')}</li>
                  <li>{t('privacy.rights.5')}</li>
                  <li>{t('privacy.rights.6')}</li>
                  <li>{t('privacy.rights.7')}</li>
                  <li>{t('privacy.rights.8')}</li>
                </ul>
              </div>
            </div>

            {/* 7. Cookies and Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.cookies.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.cookies.content')}
              </p>
            </div>

            {/* 8. Third-Party Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.thirdparty.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.thirdparty.content')}
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.children.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.children.content')}
              </p>
            </div>

            {/* 10. International Data Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.international.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.international.content')}
              </p>
            </div>

            {/* 11. GDPR Compliance */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.gdpr.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.gdpr.content')}
              </p>
            </div>

            {/* 12. Changes to Privacy Policy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.changes.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.changes.content')}
              </p>
            </div>

            {/* 13. Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('privacy.contact.title')}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
                <p>{t('privacy.contact.content')}</p>
                <div className="space-y-2">
                  <p className="font-semibold">{t('privacy.contact.dpo')}</p>
                  <p>{t('privacy.contact.email')}</p>
                  <p>{t('privacy.contact.phone')}</p>
                  <p>{t('privacy.contact.address')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
