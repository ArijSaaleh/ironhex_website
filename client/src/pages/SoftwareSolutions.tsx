import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Download, Check } from 'lucide-react';

interface SoftwareProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  category: 'security' | 'iot' | 'enterprise';
}

const softwareProducts: SoftwareProduct[] = [
  {
    id: 'firewall-pro',
    name: 'IRONHEX Firewall Pro',
    description: 'Advanced next-generation firewall solution with AI-powered threat detection',
    features: [
      'Real-time threat intelligence',
      'DPI (Deep Packet Inspection)',
      'VPN support',
      'Centralized management dashboard',
      '24/7 Technical support'
    ],
    price: 'Contact for pricing',
    category: 'security'
  },
  {
    id: 'iot-platform',
    name: 'IRONHEX IoT Platform',
    description: 'Complete IoT device management and monitoring platform',
    features: [
      'Device provisioning and management',
      'Real-time monitoring',
      'Data analytics and visualization',
      'Remote firmware updates',
      'API integration'
    ],
    price: 'Starting at $299/month',
    category: 'iot'
  },
  {
    id: 'security-suite',
    name: 'Enterprise Security Suite',
    description: 'Comprehensive security solution for enterprise environments',
    features: [
      'Endpoint protection',
      'Email security',
      'Data loss prevention',
      'SIEM integration',
      'Compliance reporting'
    ],
    price: 'Contact for pricing',
    category: 'security'
  },
  {
    id: 'vulnerability-scanner',
    name: 'Vulnerability Scanner Pro',
    description: 'Automated vulnerability assessment and management tool',
    features: [
      'Automated scanning',
      'Risk prioritization',
      'Remediation guidance',
      'Compliance templates',
      'Custom reporting'
    ],
    price: '$199/month',
    category: 'security'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'security':
      return 'bg-red-100 text-red-800';
    case 'iot':
      return 'bg-blue-100 text-blue-800';
    case 'enterprise':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface PurchaseFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export default function SoftwareSolutions() {
  const [selectedProduct, setSelectedProduct] = useState<SoftwareProduct | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PurchaseFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();

  const handlePurchaseClick = (product: SoftwareProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the purchase request to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Purchase Request Submitted!",
        description: `Thank you for your interest in ${selectedProduct?.name}. Our sales team will contact you shortly.`,
      });
      
      // Reset form and close dialog
      setFormData({ companyName: '', contactName: '', email: '', phone: '' });
      setIsDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit purchase request. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Software Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready-to-deploy software solutions designed to enhance your security posture and IoT infrastructure
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {softwareProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
                    {product.category.toUpperCase()}
                  </span>
                </div>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Features List */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pricing</p>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => handlePurchaseClick(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-6 text-white/90">
            Our team can develop tailored software solutions to meet your specific requirements
          </p>
          <Button variant="secondary" size="lg">
            Contact Our Sales Team
          </Button>
        </div>

        {/* Purchase Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Purchase {selectedProduct?.name}</DialogTitle>
              <DialogDescription>
                Fill in your details and our sales team will contact you to complete the purchase.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitPurchase}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
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
                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                  <p className="text-sm text-gray-600 mb-1">Selected Product:</p>
                  <p className="font-semibold text-gray-900">{selectedProduct?.name}</p>
                  <p className="text-primary font-bold mt-1">{selectedProduct?.price}</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
