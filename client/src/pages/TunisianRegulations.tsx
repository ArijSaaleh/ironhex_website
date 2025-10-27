import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, AlertCircle } from 'lucide-react';

export default function TunisianRegulations() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tunisian Cybersecurity Regulations
          </h1>
          <p className="text-xl text-gray-600">
            Understanding Tunisia's legal framework for cybersecurity and data protection
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 font-semibold mb-1">Regulatory Compliance</h3>
              <p className="text-blue-800">
                IRONHEX ensures all services comply with Tunisian cybersecurity laws and international standards.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Data Protection Law</CardTitle>
              </div>
              <CardDescription>
                Organic Law No. 2004-63 on the Protection of Personal Data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Tunisia's data protection law establishes the framework for collecting, processing, and storing personal data. 
                Organizations must obtain explicit consent before processing personal information and implement appropriate 
                security measures to protect data.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Registration with the National Authority for Personal Data Protection (INPDP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Implementation of technical and organizational security measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Data breach notification within 72 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Data subject rights including access, rectification, and deletion</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Cybercrime Law</CardTitle>
              </div>
              <CardDescription>
                Law No. 2004-5 on Computer Security and Data Protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This law addresses cybercrime and establishes penalties for unauthorized access to computer systems, 
                data theft, and other cyber offenses. It provides the legal foundation for prosecuting cybercriminals 
                and protecting critical information infrastructure.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Covered Offenses:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Unauthorized access to computer systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Data theft and fraud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Distribution of malware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Cyber harassment and online threats</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Electronic Communications Regulation</CardTitle>
              <CardDescription>
                Telecommunications Code and INTT Regulations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The National Telecommunications Institute of Tunisia (INTT) regulates electronic communications 
                and network security. Service providers must comply with technical standards and security requirements.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">How IRONHEX Ensures Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                IRONHEX works with organizations to ensure full compliance with Tunisian cybersecurity regulations:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance Audits</h4>
                  <p className="text-gray-700 text-sm">
                    Comprehensive assessments of your current compliance status against Tunisian regulations
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Policy Development</h4>
                  <p className="text-gray-700 text-sm">
                    Creation of policies and procedures aligned with legal requirements
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Security Implementation</h4>
                  <p className="text-gray-700 text-sm">
                    Deployment of technical controls to meet regulatory security standards
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Ongoing Monitoring</h4>
                  <p className="text-gray-700 text-sm">
                    Continuous compliance monitoring and reporting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Disclaimer:</strong> This information is provided for general guidance only and does not constitute legal advice. 
            For specific legal questions, please consult with a qualified legal professional.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Compliance?</h2>
          <p className="text-lg mb-6 text-white/90">
            Contact our experts to ensure your organization meets all regulatory requirements
          </p>
          <a 
            href="#contact-us-footer"
            className="inline-block bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
