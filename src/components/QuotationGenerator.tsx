
import React, { useState, useRef } from 'react';
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, Download, Send } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

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
    { id: 'service1', name: 'Logo Design', price: 750, checked: false },
    { id: 'service2', name: 'Flyer or Poster Design', price: 300, checked: false },
    { id: 'service3', name: 'Brochure', price: 400, checked: false },
    { id: 'service4', name: 'Company Profile Design', price: 400, checked: false },
    { id: 'service5', name: 'Web Development', price: 12000, checked: false }
  ]);
  
  const [discount, setDiscount] = useState<number>(0);
  const [comments, setComments] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
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
    setDiscount(isNaN(value) ? 0 : Math.min(100, Math.max(0, value)));
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
  
  const generateQuotePDF = (): string => {
    const doc = new jsPDF();
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setDate(today.getDate() + 7);
    
    // Add logo and header
    doc.setFontSize(20);
    doc.setTextColor(0, 98, 107);
    doc.text("TechSphere", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.text("Graphic Design Quotation", 105, 30, { align: "center" });
    
    // Add a horizontal line
    doc.setDrawColor(0, 98, 107);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Company information (left side)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Company's Information:", 20, 45);
    doc.setFontSize(10);
    doc.text("TechSphere Technologies", 20, 55);
    doc.text("Email: techspheretechnologies1400@gmail.com", 20, 62);
    
    // Client information (right side)
    doc.setFontSize(12);
    doc.text("Client's Information:", 120, 45);
    doc.setFontSize(10);
    doc.text(`Name: ${clientInfo.name}`, 120, 55);
    doc.text(`Email: ${clientInfo.email}`, 120, 62);
    doc.text(`Phone: ${clientInfo.phone}`, 120, 69);
    doc.text(`Company: ${clientInfo.company || "N/A"}`, 120, 76);
    
    // Quotation details
    doc.setFontSize(12);
    doc.text("Quotation Details:", 20, 90);
    doc.setFontSize(10);
    doc.text(`Date: ${today.toLocaleDateString()}`, 20, 100);
    doc.text(`Valid Until: ${expiryDate.toLocaleDateString()}`, 20, 107);
    doc.text(`Reference: QT-${Math.floor(Math.random() * 10000)}`, 20, 114);
    
    // Selected services table
    const selectedServices = services.filter(service => service.checked);
    
    const tableColumn = ["Service", "Price (K)"];
    const tableRows = selectedServices.map(service => [
      service.name,
      service.price.toString()
    ]);
    
    // Add service table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 125,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 98, 107] }
    });
    // Add subtotal, discount, and total
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    
    doc.text(`Subtotal: K${totalPrice.toFixed(2)}`, 140, finalY + 10);
    
    if (discount > 0) {
      doc.text(`Discount (${discount}%): K${(totalPrice * (discount / 100)).toFixed(2)}`, 140, finalY + 20);
      doc.text(`Total: K${discountedTotal.toFixed(2)}`, 140, finalY + 30);
    } else {
      doc.text(`Total: K${totalPrice.toFixed(2)}`, 140, finalY + 20);
    }
    // Ensure discount does not exceed 20%
    if (discount > 20) {
      toast({
      title: "Discount Limit Exceeded",
      description: "Maximum discount allowed is 20%.",
      variant: "destructive",
      });
      return;  // Stop PDF generation if discount exceeds limit
    } 
    // Add comments if any
    if (comments) {
      doc.text("Additional Comments:", 20, finalY + 40);
      
      // Split long comments to fit on the page
      const splitComments = doc.splitTextToSize(comments, 170);
      doc.text(splitComments, 20, finalY + 50);
    }
    
    // Add payment terms
    const termsY = comments ? finalY + 60 + (comments.length / 80) * 10 : finalY + 40;
    
    doc.setFontSize(12);
    doc.text("Payment Terms:", 20, termsY);
    doc.setFontSize(10);
    doc.text("• 50% deposit required upon acceptance of this quotation", 20, termsY + 10);
    doc.text("• Remaining balance due upon project completion", 20, termsY + 20);
    doc.text("• Payment methods: Bank transfer, mobile money", 20, termsY + 30);
    
    // Add signature section
    doc.text("Acceptance:", 20, termsY + 50);
    doc.text("Please sign below to indicate your acceptance of this quotation", 20, termsY + 60);
    
    doc.line(20, termsY + 80, 100, termsY + 80);
    doc.text("Client Signature", 20, termsY + 90);
    
    doc.line(120, termsY + 80, 190, termsY + 80);
    doc.text("Date", 120, termsY + 90);
    
    // Footer
    doc.setFontSize(8);
    doc.text("Thank you for choosing TechSphere Technologies!", 105, 285, { align: "center" });
    
    // Generate base64 string of the PDF
    return doc.output('datauristring');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setShowConfirmDialog(true);
  };
  
  const handleConfirmQuote = () => {
    // Generate the PDF
    const pdfDataUri = generateQuotePDF();
    
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `TechSphere_Quotation_${new Date().toISOString().slice(0,10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Prepare email content
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
      `I have downloaded the quotation PDF and will send the signed copy back to you.\n\n` +
      `Best regards,\n` +
      `${clientInfo.name}`
    );
    
    // Create the mailto link
    const mailtoLink = `mailto:techspheretechnologies1400@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Open the email client
    window.location.href = mailtoLink;
    
    // Close dialog and show toast
    setShowConfirmDialog(false);
    
    toast({
      title: "Quotation generated successfully",
      description: "Your quotation has been downloaded. Please sign and return it to us via email.",
    });
    
    // Reset form for new quote
    setServices(services.map(service => ({ ...service, checked: false })));
    setDiscount(0);
    setComments('');
    setClientInfo({
      name: '',
      email: '',
      phone: '',
      company: ''
    });
  };
  
  return (
    <section className="py-12 bg-gradient-to-r from-background/80 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="heading-md mb-6">Create Your Own Quote</h2>
          <p className="subheading max-w-3xl mx-auto">
            Select the services you need and get an instant quotation tailored to your requirements.
          </p>
        </div>
        
        <div className="glassmorphism rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Services Selection - Left Side */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-teal mb-4">Available Services</h3>
              
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
                <h3 className="text-xl font-semibold text-teal mb-4">Your Information</h3>
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
              <h3 className="text-xl font-semibold text-teal mb-4">Quote Summary</h3>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-white/80">Subtotal:</span>
                  <span className="text-xl font-semibold">K{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter discount percentage"
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
                Your quotation is ready to be generated and downloaded.
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
                <li>Download a PDF of your quotation</li>
                <li>Send an email notification to our team</li>
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
                <Download className="h-4 w-4" />
                Generate & Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default QuotationGenerator;
