import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TunisianRegulations() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('reg.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('reg.subtitle')}
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 dark:text-blue-300 font-semibold mb-1">{t('reg.alert.title')}</h3>
              <p className="text-blue-800 dark:text-blue-200">
                {t('reg.alert.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl dark:text-white">{t('reg.section1.title')}</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">
                {t('reg.section1.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('reg.section1.p1')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section1.requirements')}</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section1.req1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section1.req2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section1.req3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section1.req4')}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl dark:text-white">{t('reg.section2.title')}</CardTitle>
              </div>
              <CardDescription className="dark:text-gray-400">
                {t('reg.section2.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('reg.section2.p1')}
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section2.offenses')}</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section2.off1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section2.off2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section2.off3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('reg.section2.off4')}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">{t('reg.section3.title')}</CardTitle>
              <CardDescription className="dark:text-gray-400">
                {t('reg.section3.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('reg.section3.p1')}
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">{t('reg.section4.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('reg.section4.p1')}
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section4.service1.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('reg.section4.service1.desc')}
                  </p>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section4.service2.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('reg.section4.service2.desc')}
                  </p>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section4.service3.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('reg.section4.service3.desc')}
                  </p>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('reg.section4.service4.title')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('reg.section4.service4.desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            <strong className="dark:text-gray-300">{t('reg.disclaimer.title')}</strong> {t('reg.disclaimer.text')}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('reg.cta.title')}</h2>
          <p className="text-lg mb-6 text-white/90">
            {t('reg.cta.desc')}
          </p>
          <a 
            href="#contact-us-footer"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('reg.cta.button')}
          </a>
        </div>
      </div>
    </div>
  );
}
