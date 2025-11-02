import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import CustomCursor from '../components/CustomCursor';

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: 'general' | 'services' | 'technical' | 'billing';
}

const faqKeys: FAQItem[] = [
  { questionKey: 'faq.q1', answerKey: 'faq.a1', category: 'general' },
  { questionKey: 'faq.q2', answerKey: 'faq.a2', category: 'general' },
  { questionKey: 'faq.q4', answerKey: 'faq.a4', category: 'general' },
  { questionKey: 'faq.q11', answerKey: 'faq.a11', category: 'general' },
  { questionKey: 'faq.q3', answerKey: 'faq.a3', category: 'services' },
  { questionKey: 'faq.q5', answerKey: 'faq.a5', category: 'services' },
  { questionKey: 'faq.q7', answerKey: 'faq.a7', category: 'services' },
  { questionKey: 'faq.q10', answerKey: 'faq.a10', category: 'services' },
  { questionKey: 'faq.q12', answerKey: 'faq.a12', category: 'services' },
  { questionKey: 'faq.q6', answerKey: 'faq.a6', category: 'technical' },
  { questionKey: 'faq.q9', answerKey: 'faq.a9', category: 'technical' },
  { questionKey: 'faq.q8', answerKey: 'faq.a8', category: 'billing' },
];

export default function FAQ() {
  const { t } = useLanguage();
  const categories = ['general', 'services', 'technical', 'billing'] as const;

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors cursor-none">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryFaqs = faqKeys.filter((faq) => faq.category === category);
            
            return (
              <Card key={category} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="fas fa-question text-white text-lg"></i>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold dark:text-white">{t(`faq.cat.${category}`)}</CardTitle>
                      <CardDescription className="dark:text-gray-400 text-sm">
                        {categoryFaqs.length} {categoryFaqs.length !== 1 ? t('faq.questions_plural') : t('faq.questions')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Accordion type="single" collapsible className="w-full">
                    {categoryFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`} className="border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="text-left dark:text-white dark:hover:text-primary hover:text-primary transition-colors font-semibold py-4">
                          {t(faq.questionKey)}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed pb-4">
                          {t(faq.answerKey)}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('faq.cta.title')}</h2>
          <p className="text-lg mb-6 text-white/90">
            {t('faq.cta.desc')}
          </p>
          <a 
            href="#contact-us-footer"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('faq.cta.button')}
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
