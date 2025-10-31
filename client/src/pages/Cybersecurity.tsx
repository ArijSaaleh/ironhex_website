import Typewriter from "../components/Typewriter";
import { useLanguage } from "../contexts/LanguageContext";
import SEO from "../components/SEO";

export default function Cybersecurity() {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO
        title={t('cyber.hero.title')}
        description={t('cyber.hero.desc')}
        keywords="cybersecurity, security services, penetration testing, vulnerability assessment, Tunisia"
      />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-gray-900 dark:bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://2629098.fs1.hubspotusercontent-na1.net/hubfs/2629098/Blog%20Images/The-Importance-of-Cybersecurity-for-MSPs_.gif')] bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-gray-900/20 dark:from-green-900/95 dark:to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            <Typewriter text={t('cyber.hero.title')} speed={90} />
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
            {t('cyber.hero.desc')}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#cyber-offerings"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors duration-200"
            >
              {t('cyber.hero.offerings')}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="#contact-us-footer"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              {t('cyber.hero.consultation')}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t('cyber.intro.title')}
          </h2>
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
            <p>
              {t('cyber.intro.p1')}
            </p>
            <p>
              {t('cyber.intro.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="cyber-offerings" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {t('cyber.services.title')}
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t('cyber.service1.title'),
                desc: t('cyber.service1.desc')
              },
              {
                title: t('cyber.service2.title'),
                desc: t('cyber.service2.desc')
              },
              {
                title: t('cyber.service3.title'),
                desc: t('cyber.service3.desc')
              },
              {
                title: t('cyber.service4.title'),
                desc: t('cyber.service4.desc')
              },
              {
                title: t('cyber.service5.title'),
                desc: t('cyber.service5.desc')
              },
              {
                title: t('cyber.service6.title'),
                desc: t('cyber.service6.desc')
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
