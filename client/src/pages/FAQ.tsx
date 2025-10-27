import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'services' | 'technical' | 'billing';
}

const faqs: FAQItem[] = [
  {
    question: 'What services does IRONHEX provide?',
    answer: 'IRONHEX specializes in comprehensive cybersecurity solutions and IoT services. We offer penetration testing, security audits, vulnerability assessments, IoT device management, and custom software solutions for enterprise clients.',
    category: 'general'
  },
  {
    question: 'How can I get started with IRONHEX services?',
    answer: 'Getting started is easy! Simply contact us through our contact form, email, or phone. Our team will schedule a consultation to understand your requirements and propose the best solution for your needs.',
    category: 'general'
  },
  {
    question: 'Do you provide 24/7 support?',
    answer: 'Yes, we offer 24/7 support for our enterprise clients and managed service customers. Our support team is always available to address critical security incidents and provide technical assistance.',
    category: 'services'
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve a wide range of industries including financial services, healthcare, manufacturing, retail, government agencies, and technology companies. Our solutions are tailored to meet industry-specific compliance and security requirements.',
    category: 'general'
  },
  {
    question: 'How long does a security audit take?',
    answer: 'The duration of a security audit depends on the scope and complexity of your infrastructure. Typically, a comprehensive audit takes 2-4 weeks. We provide a detailed timeline during the initial consultation.',
    category: 'services'
  },
  {
    question: 'What is penetration testing?',
    answer: 'Penetration testing is a simulated cyber attack on your system to identify vulnerabilities before malicious actors can exploit them. Our certified ethical hackers use industry-standard methodologies to test your security posture.',
    category: 'technical'
  },
  {
    question: 'Do you offer training services?',
    answer: 'Yes, we provide security awareness training for employees, technical training for IT teams, and specialized cybersecurity certification preparation courses.',
    category: 'services'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models including project-based, monthly retainers, and custom packages. Pricing depends on the scope of services, duration, and specific requirements. Contact us for a detailed quote.',
    category: 'billing'
  },
  {
    question: 'Are your solutions compliant with regulations?',
    answer: 'Yes, our solutions are designed to help you meet various compliance requirements including GDPR, HIPAA, PCI-DSS, ISO 27001, and local regulations. We can assist with compliance audits and documentation.',
    category: 'technical'
  },
  {
    question: 'Can you help with incident response?',
    answer: 'Absolutely. We offer rapid incident response services to help you contain, investigate, and recover from security breaches. Our team can be engaged on-demand or through a retainer for priority response.',
    category: 'services'
  },
  {
    question: 'What makes IRONHEX different from competitors?',
    answer: 'IRONHEX combines deep technical expertise with a customer-first approach. We provide tailored solutions, maintain transparency throughout engagements, and ensure knowledge transfer to empower your team.',
    category: 'general'
  },
  {
    question: 'Do you provide remote or on-site services?',
    answer: 'We offer both remote and on-site services depending on your requirements. Many assessments can be conducted remotely, while others may require on-site presence for physical security testing or sensitive environments.',
    category: 'services'
  }
];

const categoryNames = {
  general: 'General Information',
  services: 'Services & Support',
  technical: 'Technical Questions',
  billing: 'Pricing & Billing'
};

export default function FAQ() {
  const categories = ['general', 'services', 'technical', 'billing'] as const;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about IRONHEX services
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryFaqs = faqs.filter((faq) => faq.category === category);
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-2xl">{categoryNames[category]}</CardTitle>
                  <CardDescription>
                    {categoryFaqs.length} question{categoryFaqs.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {categoryFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                          {faq.answer}
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
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg mb-6 text-white/90">
            Our team is here to help. Contact us for personalized assistance.
          </p>
          <a 
            href="#contact-us-footer"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
