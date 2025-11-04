import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, ShoppingBag, Briefcase, Heart, Calendar, Monitor } from 'lucide-react';
import Typewriter from '../components/Typewriter';
import CustomCursor from '../components/CustomCursor';
import { apiUrl } from '../config/api'

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
      const response = await fetch(apiUrl('/api/demo-requests', {
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
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors cursor-none">
        {/* Hero Section - Modern Light Design */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-20">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 text-sm font-semibold">
              <i className="fas fa-code"></i>
              <span>Ready-Made Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight">
              <Typewriter text="Website Platforms" speed={90} />
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Built for Your Business
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Professional, fully-functional website platforms ready to deploy. Request a live demo to see them in action.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#platforms"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold hover:shadow-2xl hover:shadow-primary/50 transition-all hover:-translate-y-1"
              >
                <i className="fas fa-rocket"></i>
                Explore Platforms
                <i className="fas fa-arrow-down group-hover:translate-y-1 transition-transform"></i>
              </a>
              <a
                href="#contact-us-footer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 font-semibold hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
              >
                <i className="fas fa-comments"></i>
                Custom Solution
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-6">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <i className="fas fa-bolt text-primary text-xl"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Deploy</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <i className="fas fa-shield-check text-primary text-xl"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fully Tested</span>
              </div>
            </div>
          </div>

          {/* Right Content - Software Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop" 
                alt="Software Solutions"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-laptop-code text-white text-xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">6 Platforms</p>
                      <p className="text-sm text-gray-600">Ready to Deploy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-check-circle text-purple-500"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
                  <p className="font-bold text-gray-900 dark:text-white">100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header */}
        <div id="platforms" className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Platforms</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Choose Your Solution
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select from our ready-made platforms or request a custom solution tailored to your needs
          </p>
        </div>

        {/* Platform Cards - Premium Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websitePlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <Card key={platform.id} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-full w-full text-white" />
                    </div>
                    <span className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                      {platform.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold dark:text-white mb-3">{platform.name}</CardTitle>
                  <CardDescription className="text-base mt-2 dark:text-gray-300 leading-relaxed">
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
        <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-3xl p-12">
          <div className="relative bg-gradient-to-br from-primary via-emerald-600 to-primary rounded-3xl shadow-2xl overflow-hidden p-12">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <i className="fas fa-magic"></i>
                Custom Development
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need a Custom Website Solution?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Our team can develop a tailored website platform specifically designed for your unique business requirements
              </p>
              
              <a 
                href="#contact-us-footer"
                className="group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <i className="fas fa-comments"></i>
                Contact Us for Custom Development
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>
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
    </>
  );
}

