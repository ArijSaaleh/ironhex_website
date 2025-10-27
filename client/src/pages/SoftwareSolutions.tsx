import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, ShoppingBag, Briefcase, Heart, Calendar, Monitor } from 'lucide-react';

interface WebsitePlatform {
  id: string;
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: any;
  demoUrl?: string;
  category: string;
}

const websitePlatforms: WebsitePlatform[] = [
  {
    id: 'elearning-platform',
    name: 'E-Learning Platform',
    description: 'Complete learning management system with course creation, student management, and interactive content',
    features: [
      'Course creation and management',
      'Video streaming and live classes',
      'Student progress tracking',
      'Quizzes and assignments',
      'Certificates and badges',
      'Payment integration',
      'Discussion forums',
      'Mobile responsive design'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    icon: GraduationCap,
    category: 'Education'
  },
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    description: 'Full-featured online store with product management, shopping cart, and secure payment processing',
    features: [
      'Product catalog management',
      'Shopping cart and checkout',
      'Multiple payment gateways',
      'Order tracking and management',
      'Customer reviews and ratings',
      'Inventory management',
      'Sales analytics and reports',
      'SEO optimized'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    icon: ShoppingBag,
    category: 'E-Commerce'
  },
  {
    id: 'business-management',
    name: 'Business Management System',
    description: 'Comprehensive ERP solution for managing operations, inventory, HR, and finances',
    features: [
      'Customer relationship management (CRM)',
      'Inventory and supply chain management',
      'HR and payroll management',
      'Financial accounting',
      'Project management tools',
      'Real-time reporting and analytics',
      'Multi-user access control',
      'Document management'
    ],
    technologies: ['React', 'Python', 'MySQL', 'Redis'],
    icon: Briefcase,
    category: 'Business'
  },
  {
    id: 'healthcare-portal',
    name: 'Healthcare Management Portal',
    description: 'Patient management system with appointment scheduling, medical records, and telemedicine',
    features: [
      'Patient registration and profiles',
      'Appointment scheduling',
      'Electronic medical records (EMR)',
      'Prescription management',
      'Telemedicine video consultations',
      'Billing and insurance claims',
      'Lab results management',
      'HIPAA compliant'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    icon: Heart,
    category: 'Healthcare'
  },
  {
    id: 'event-booking',
    name: 'Event & Booking Platform',
    description: 'Event management and booking system with ticketing, scheduling, and attendee management',
    features: [
      'Event creation and publishing',
      'Online ticket sales',
      'Seat selection and allocation',
      'QR code ticket validation',
      'Email notifications',
      'Attendee check-in system',
      'Revenue tracking',
      'Calendar integration'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    icon: Calendar,
    category: 'Events'
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio & Showcase Platform',
    description: 'Professional portfolio website builder for agencies, freelancers, and creatives',
    features: [
      'Drag-and-drop page builder',
      'Portfolio gallery with filters',
      'Client testimonials section',
      'Contact form integration',
      'Blog with CMS',
      'SEO optimization tools',
      'Analytics dashboard',
      'Custom domain support'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS'],
    icon: Monitor,
    category: 'Portfolio'
  }
];

interface DemoFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
}

export default function SoftwareSolutions() {
  const [selectedPlatform, setSelectedPlatform] = useState<WebsitePlatform | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    message: ''
  });
  const { toast } = useToast();

  const handleDemoRequest = (platform: WebsitePlatform) => {
    setSelectedPlatform(platform);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          platform_id: selectedPlatform?.id,
          platform_name: selectedPlatform?.name,
          platform_category: selectedPlatform?.category,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName || null,
          message: formData.message || null
        })
      });

      if (response.ok) {
        toast({
          title: "Demo Request Submitted!",
          description: `Thank you for your interest in ${selectedPlatform?.name}. Our team will contact you within 24 hours to schedule a demo.`,
        });
        
        // Reset form and close dialog
        setFormData({ fullName: '', email: '', phone: '', companyName: '', message: '' });
        setIsDialogOpen(false);
        setSelectedPlatform(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit demo request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit demo request. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ready-Made Website Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional, fully-functional website platforms ready to deploy. Request a live demo to see them in action.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websitePlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Card key={platform.id} className="hover:shadow-xl transition-all hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 p-3 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                      {platform.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl dark:text-white">{platform.name}</CardTitle>
                  <CardDescription className="text-base mt-2 dark:text-gray-300">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Key Features:</h4>
                    <ul className="space-y-2">
                      {platform.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                      {platform.features.length > 5 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400 italic pl-7">
                          +{platform.features.length - 5} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-xs uppercase tracking-wide">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Demo Button */}
                  <Button className="w-full" onClick={() => handleDemoRequest(platform)}>
                    <Monitor className="h-4 w-4 mr-2" />
                    Request Live Demo
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 dark:from-primary/90 dark:to-blue-700 text-white rounded-xl p-8 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Website Solution?</h2>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            Our team can develop a tailored website platform specifically designed for your unique business requirements
          </p>
          <Button variant="secondary" size="lg" className="shadow-lg">
            Contact Us for Custom Development
          </Button>
        </div>

        {/* Demo Request Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[550px] dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 dark:text-white">
                <Monitor className="h-5 w-5 text-primary" />
                Request Demo - {selectedPlatform?.name}
              </DialogTitle>
              <DialogDescription className="dark:text-gray-300">
                Fill in your details and we'll schedule a personalized demo session to showcase the platform's capabilities.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitDemo}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+216 XX XXX XXX"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name (Optional)</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements or specific features you're interested in..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mt-2 border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-1">Selected Platform:</p>
                  <p className="font-bold text-blue-900">{selectedPlatform?.name}</p>
                  <p className="text-xs text-blue-700 mt-1">{selectedPlatform?.category}</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary">
                  <Monitor className="h-4 w-4 mr-2" />
                  Submit Demo Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
