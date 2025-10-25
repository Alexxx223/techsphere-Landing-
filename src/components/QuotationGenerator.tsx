
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Download, Mail } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const QuotationGenerator = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    { id: 'service1', name: 'Logo Design', price: 850, checked: false },
    { id: 'service2', name: 'Flyer or Poster Design', price: 500, checked: false },
    { id: 'service3', name: 'Brochure', price: 700, checked: false },
    { id: 'service4', name: 'Company Profile Design', price: 700, checked: false },
    { id: 'service5', name: 'Web Development', price: 12000, checked: false }
  ]);
  
  const [discount, setDiscount] = useState<number>(0);
  const [comments, setComments] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [showQuotationPreview, setShowQuotationPreview] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  
  // Calculate total
  const totalPrice = services.reduce((acc, service) => {
    return acc + (service.checked ? service.price : 0);
  }, 0);
  
  const discountedTotal = totalPrice - (totalPrice * (discount / 100));
  
  const handleServiceChange = (id: string, checked: boolean) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, checked } : service
    ));
  };
  
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // Limit discount to maximum 5%
    setDiscount(isNaN(value) ? 0 : Math.min(5, Math.max(0, value)));
  };
  
  const handleClientInfoChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo({ ...clientInfo, [field]: value });
  };
  
  const validateForm = (): boolean => {
    // Check if at least one service is selected
    if (!services.some(service => service.checked)) {
      toast({
        title: "No services selected",
        description: "Please select at least one service for your quotation.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check if client info is filled
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required client information fields.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  // QuotationPreview component for HTML-based quotation
  const QuotationPreview = () => {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 2);
    
    const selectedServices = services.filter(service => service.checked);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 5);

    return (
      <div id="quote-print-root" className="quotation-preview bg-white text-black p-8 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-teal-600 mb-2">Techsphere Technologies</h1>
          <h2 className="text-lg font-semibold">Graphic Design Quotation</h2>
        </div>

        {/* Company and Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-sm mb-3">Company's Information:</h3>
            <div className="text-sm space-y-1">
              <p>Techsphere Technologies</p>
              <p>techspheretechnologies1400@gmail.com</p>
              <p>+260 772792882</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-sm mb-3">Client's Information:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Name:</strong> {clientInfo.name}</p>
              <p><strong>Email:</strong> {clientInfo.email}</p>
              <p><strong>Phone:</strong> {clientInfo.phone}</p>
              <p><strong>Company:</strong> {clientInfo.company || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-sm mb-2">Project Title:</h3>
            <p className="text-sm">{selectedServices[0]?.name || "Custom Design Project"}</p>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-2">Date:</h3>
            <p className="text-sm">{today.toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: '2-digit' 
            })}</p>
          </div>
        </div>

        {/* Greeting and Overview */}
        <div className="mb-8">
          <p className="text-sm mb-4">Dear {clientInfo.name},</p>
          <h3 className="font-bold text-sm mb-2">Project Overview:</h3>
          <p className="text-sm">
            This quote contains costs for the requested design services. My understanding of your requirements, 
            based on your selections, is reflected in the services listed below.
          </p>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h3 className="font-bold text-sm mb-4">Design Fee Breakdown:</h3>
          <table className="print-table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Task Description</th>
                <th className="border border-gray-300 p-3 text-center">Quantity</th>
                <th className="border border-gray-300 p-3 text-right">Price per quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedServices.map((service, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-3">{service.name}</td>
                  <td className="border border-gray-300 p-3 text-center">1</td>
                  <td className="border border-gray-300 p-3 text-right">K {service.price.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="border border-gray-300 p-3" colSpan={2}>Total:</td>
                <td className="border border-gray-300 p-3 text-right">K {discountedTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Timeline Table */}
        <div className="mb-8">
          <h3 className="font-bold text-sm mb-4">Project Timeline:</h3>
          <table className="print-table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Task</th>
                <th className="border border-gray-300 p-3 text-center">Start Date</th>
                <th className="border border-gray-300 p-3 text-center">End Date</th>
              </tr>
            </thead>
            <tbody>
              {selectedServices.map((service, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-3">{service.name}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    {startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Terms */}
        <div className="mb-8">
          <h3 className="font-bold text-sm mb-3">Payment Terms:</h3>
          <div className="text-sm space-y-1">
            <p>• 50% deposit required upon acceptance.</p>
            <p>• Balance due upon completion.</p>
            <p>• Payment: 0772792882 or 0761525239 (Mobile Money)</p>
          </div>
        </div>

        {/* Revisions and Validity */}
        <div className="mb-8">
          <h3 className="font-bold text-sm mb-3">Revisions:</h3>
          <p className="text-sm">
            Quote valid for 2 days ({today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })} to {expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })})
          </p>
        </div>

        {/* Additional Comments */}
        {comments && comments.trim() && (
          <div className="mb-8 page-break">
            <h3 className="font-bold text-sm mb-3">Additional Comments:</h3>
            <p className="text-sm whitespace-pre-wrap">{comments}</p>
          </div>
        )}

        {/* Closing */}
        <div className="mt-12">
          <p className="text-sm mb-4">Thank you for considering us for your project.</p>
          <p className="text-sm">Best Regards,</p>
          <p className="text-sm font-bold mt-2">TechSphere Technologies</p>
        </div>
      </div>
    );
  };

  const handleDownload = () => {
    const element = document.getElementById('quote-print-root');
    if (!element) {
      toast({
        title: "Error",
        description: "Could not find quotation content to download.",
        variant: "destructive",
      });
      return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Quotation-${clientInfo.name.replace(/\s+/g, '_')}-${timestamp}.pdf`;

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save()
      .then(() => {
        toast({
          title: "Download Started",
          description: "Your PDF is being downloaded.",
          variant: "default",
        });
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        toast({
          title: "Download Failed",
          description: "Unable to generate PDF. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleEmailShare = () => {
    const selectedServices = services.filter(service => service.checked)
      .map(service => `${service.name} (K${service.price})`)
      .join(", ");
    
    const emailSubject = encodeURIComponent(`Quotation Request: ${clientInfo.name}`);
    const emailBody = encodeURIComponent(
      `Dear TechSphere Team,\n\n` +
      `I have generated a quotation for the following services: ${selectedServices}.\n\n` +
      `Total quote amount: K${discountedTotal.toFixed(2)}\n\n` +
      `My details:\n` +
      `Name: ${clientInfo.name}\n` +
      `Email: ${clientInfo.email}\n` +
      `Phone: ${clientInfo.phone}\n` +
      `Company: ${clientInfo.company || "N/A"}\n\n` +
      `Additional comments: ${comments || "None"}\n\n` +
      `Please find the quotation details above. I will print and sign the quotation if we proceed.\n\n` +
      `Best regards,\n` +
      `${clientInfo.name}`
    );
    
    const mailtoLink = `mailto:techspheretechnologies1400@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setShowConfirmDialog(true);
  };

  const handleConfirmQuote = () => {
    // Final validation before showing quotation
    if (!validateForm()) {
      return;
    }
    
    // Close confirmation dialog and show quotation preview
    setShowConfirmDialog(false);
    setShowQuotationPreview(true);
    
    toast({
      title: "Success!",
      description: "Quotation generated successfully. You can now download it as PDF or email it.",
      variant: "default",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-background/80 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="madeinhaus-display-sm mb-6">Create Your Own Quote</h2>
          <p className="madeinhaus-body-large max-w-3xl mx-auto">
            Select the services you need and get an instant quotation tailored to your requirements.
          </p>
        </div>
        
        <div className="glassmorphism rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Services Selection - Left Side */}
            <div className="space-y-6">
              <h3 className="madeinhaus-heading text-heading-sm text-teal mb-4">Available Services</h3>
              
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={service.id}
                      checked={service.checked}
                      onCheckedChange={(checked) => 
                        handleServiceChange(service.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={service.id}
                      className="text-white/90 cursor-pointer"
                    >
                      {service.name} (K{service.price})
                    </Label>
                  </div>
                ))}
              </div>
              
              {/* Client Information */}
              <div className="mt-8">
                <h3 className="madeinhaus-heading text-heading-sm text-teal mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Full Name *</Label>
                    <Input
                      id="client-name"
                      placeholder="Enter your full name"
                      value={clientInfo.name}
                      onChange={(e) => handleClientInfoChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email Address *</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={clientInfo.email}
                      onChange={(e) => handleClientInfoChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone Number *</Label>
                    <Input
                      id="client-phone"
                      placeholder="Enter your phone number"
                      value={clientInfo.phone}
                      onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client-company">Company Name (Optional)</Label>
                    <Input
                      id="client-company"
                      placeholder="Enter your company name"
                      value={clientInfo.company}
                      onChange={(e) => handleClientInfoChange('company', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quote Summary - Right Side */}
            <div className="space-y-6">
              <h3 className="madeinhaus-heading text-heading-sm text-teal mb-4">Quote Summary</h3>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/80">Subtotal:</span>
                  <span className="text-xl font-semibold">K{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%) - Max 5%</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="5"
                    placeholder="Enter discount percentage (0-5%)"
                    value={discount || ''}
                    onChange={handleDiscountChange}
                  />
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center text-white/80">
                    <span>Discount Amount:</span>
                    <span>-K{(totalPrice * (discount / 100)).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-white/90 font-semibold">Total Quote:</span>
                  <span className="text-2xl font-bold text-teal">K{discountedTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Enter any specific requirements or additional information"
                  className="min-h-[120px]"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-gradient-to-r from-teal to-cyan hover:opacity-90"
              >
                Generate Quotation
              </Button>
            </div>
          </form>
        </div>
        
        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Your Quotation</DialogTitle>
              <DialogDescription>
                Your quotation is ready to be generated. You can print it or email it directly to our team.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <h4 className="font-semibold mb-2">Selected Services:</h4>
              <ul className="space-y-1 mb-4">
                {services.filter(service => service.checked).map(service => (
                  <li key={service.id} className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-2" />
                    <span>{service.name} - K{service.price}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-between items-center py-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span className="font-bold">K{discountedTotal.toFixed(2)}</span>
              </div>
              
              <p className="mt-4 text-sm text-white/70">
                By confirming, you will:
              </p>
              <ul className="text-sm text-white/70 list-disc pl-5 space-y-1 mt-2">
                <li>Download your quotation as PDF</li>
                <li>Email quotation directly to our team</li>
                <li>After signing, please send the signed quotation back to us</li>
              </ul>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmQuote}
                className="bg-gradient-to-r from-teal to-cyan hover:opacity-90 gap-2"
              >
                <Check className="h-4 w-4" />
                Generate Quotation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quotation Preview Dialog */}
        <Dialog open={showQuotationPreview} onOpenChange={setShowQuotationPreview}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="no-print">
              <DialogTitle>Quotation Preview</DialogTitle>
              <DialogDescription>
                Review your quotation below. You can download it as PDF or email it directly.
              </DialogDescription>
            </DialogHeader>
            
            <QuotationPreview />
            
            <DialogFooter className="no-print flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => setShowQuotationPreview(false)}>
                Close
              </Button>
              <Button 
                onClick={handleEmailShare}
                variant="outline"
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Quotation
              </Button>
              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-teal to-cyan hover:opacity-90 gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default QuotationGenerator;
