
import React, { useState } from 'react';
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
import { Check, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable'; // Import for side effects

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
    { id: 'service1', name: 'Logo Design', price: 850, checked: false },
    { id: 'service2', name: 'Flyer or Poster Design', price: 500, checked: false },
    { id: 'service3', name: 'Brochure', price: 700, checked: false },
    { id: 'service4', name: 'Company Profile Design', price: 700, checked: false },
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
    // Limit discount to maximum 20%
    setDiscount(isNaN(value) ? 0 : Math.min(20, Math.max(0, value)));
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
    try { // Wrap the entire generation in a try...catch if needed
      console.log("Starting PDF generation");
      const doc = new jsPDF();
      console.log("jsPDF instance created");

      const today = new Date();
      const expiryDate = new Date(today);
      expiryDate.setDate(today.getDate() + 2); // 2 days validity

      // Check if autoTable is available before using it
      // Note: Usually, if the import succeeded, this check isn't strictly necessary,
      // but it doesn't hurt during debugging. Ensure 'jspdf-autotable' is installed.
      if (typeof doc.autoTable !== 'function') {
         console.error("autoTable is not available on jsPDF instance. Did you install jspdf-autotable?");
         toast({
           title: "PDF Generation Error",
           description: "Failed to load PDF table generation library.",
           variant: "destructive",
         });
         return ""; // Return empty string or throw an error
      }

      // --- Add Content ---

      // Add logo (Potential Issue: Ensure '/public/logo.png' is accessible in your build)
      // If this causes issues, try importing the image or using a Base64 string.
      // For now, let's assume the path works or comment it out if it fails.
      try {
          const imageUrl = '/logo.png'; // In many setups (like Vite/CRA), '/logo.png' refers to the public folder root
          // Check if the image exists before adding - this basic check might not be enough
          // You might need a more robust way to handle image loading failures.
          // For simplicity, we'll proceed, but be aware this can throw errors if the image isn't found.
          doc.addImage(imageUrl, 'PNG', 105, 15, 30, 30, undefined, 'FAST');
          console.log("Logo added (potentially)");
      } catch (imgError) {
          console.error("Failed to add logo:", imgError);
          // Optionally inform the user or continue without the logo
          toast({
              title: "Warning",
              description: "Could not load the company logo for the PDF.",
              variant: "default", // Use a less intrusive variant
          });
      }


      // Add header text
      console.log("Adding header text");
      doc.setFontSize(18);
      doc.setTextColor(0, 77, 77); // Dark teal color
      doc.text("Techsphere", 105, 55, { align: "center" });
      doc.setFontSize(14);
      doc.text("Graphic Design Quotation", 105, 65, { align: "center" });

      // Add a horizontal line
      doc.setDrawColor(0, 77, 77);
      doc.setLineWidth(0.5);
      doc.line(20, 70, 190, 70);

      // Company information (left side)
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0); // Reset to black
      doc.text("Company's Information:", 20, 80);
      doc.setFontSize(10);
      doc.text("Techsphere Technologies", 20, 88);
      doc.text("Email: techspheretechnologies1400@gmail.com", 20, 96);
      doc.text("Phone: +260 772792882", 20, 104);

      // Client information (right side)
      doc.setFontSize(11);
      doc.text("Client's Information:", 120, 80);
      doc.setFontSize(10);
      doc.text(`Name: ${clientInfo.name}`, 120, 88);
      doc.text(`Email: ${clientInfo.email}`, 120, 96);
      doc.text(`Phone: ${clientInfo.phone}`, 120, 104);
      doc.text(`Company: ${clientInfo.company || "N/A"}`, 120, 112);

      // Project Title and Date
      doc.setFontSize(11);
      doc.text("Project Title:", 20, 128);
      doc.text("Date:", 120, 128);

      doc.setFontSize(10);
      const projectTitle = services.find(service => service.checked)?.name || "Custom Design";
      doc.text(projectTitle, 20, 136);
      doc.text(today.toLocaleDateString(), 120, 136);

      // Job Reference Number
      doc.text("Job Reference Number:", 120, 144);
      doc.text(`QT-${Math.floor(Math.random() * 10000)}`, 120, 152);

      // Project Overview
      doc.setFontSize(11);
      doc.text("Project Overview:", 20, 168);
      doc.setFontSize(10);
      // Use splitTextToSize for potentially long overview text if needed
      const overviewText = "This quote contains costs for the requested design services. My understanding of your requirements, based on your selections, is reflected in the services listed below.";
      const splitOverview = doc.splitTextToSize(overviewText, 170); // Max width 170
      doc.text(splitOverview, 20, 176);

      // Calculate starting Y position for the Design Fee section based on overview text lines
      let yPos = 176 + (splitOverview.length * 5); // Adjust multiplier as needed for line spacing

      // Design Fee Breakdown
      yPos += 10; // Add some space
      doc.setFontSize(11);
      doc.text("Design Fee Breakdown:", 20, yPos);
      yPos += 8; // Space before table

      // Services table
      console.log("Creating services table");
      const selectedServices = services.filter(service => service.checked);
      const tableColumn = ["Task Description", "Quantity", "Price per quantity"];
      const tableRows = selectedServices.map(service => [
        service.name,
        "1",
        `K ${service.price.toFixed(2)}` // Format price consistently
      ]);

      doc.autoTable({ // Use doc.autoTable
        head: [tableColumn],
        body: tableRows,
        startY: yPos,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [0, 77, 77] }, // Teal header
        margin: { left: 20, right: 20 }
      });

      // Get Y position after the table
      let finalY = (doc as any).lastAutoTable.finalY || yPos + 30; // Use fallback

      // Add subtotal, discount, and total
      finalY += 5; // Add some space
      doc.setDrawColor(200, 200, 200); // Light grey line
      doc.setLineWidth(0.3);
      doc.line(120, finalY, 190, finalY); // Line above total
      finalY += 8;

      doc.setFontSize(10);
      doc.text("Subtotal:", 130, finalY);
      doc.text(`K ${totalPrice.toFixed(2)}`, 160, finalY, { align: 'right' }); // Align right

      if (discount > 0) {
        finalY += 7;
        doc.text(`Discount (${discount}%):`, 130, finalY);
        doc.text(`-K ${(totalPrice * (discount / 100)).toFixed(2)}`, 160, finalY, { align: 'right' });
        finalY += 7;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text("Total:", 130, finalY);
        doc.text(`K ${discountedTotal.toFixed(2)}`, 160, finalY, { align: 'right' });
        doc.setFont('helvetica', 'normal'); // Reset font style
      } else {
        finalY += 7;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text("Total:", 130, finalY);
        doc.text(`K ${totalPrice.toFixed(2)}`, 160, finalY, { align: 'right' });
        doc.setFont('helvetica', 'normal'); // Reset font style
      }

      // Reset Y position for next section
      yPos = finalY + 15;

      // Check if content exceeds page height, add new page if necessary
      const checkAndAddPage = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > doc.internal.pageSize.height - 30) { // Check with margin
           doc.addPage();
           return 30; // Return starting Y position for new page
        }
        return currentY; // Return current Y position
      };

      yPos = checkAndAddPage(yPos, 30); // Check space for timeline header+table

      // Project Timeline
      doc.setFontSize(11);
      doc.text("Project Timeline:", 20, yPos);
      yPos += 10;

      // Timeline table
      const timelineColumns = ["Task", "Estimated Start", "Estimated End"];
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7); // Default 1 week project duration

      const timelineRows = selectedServices.map(service => [
        service.name,
        startDate.toLocaleDateString(),
        endDate.toLocaleDateString()
      ]);

      doc.autoTable({
        head: [timelineColumns],
        body: timelineRows,
        startY: yPos,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [0, 77, 77] },
        margin: { left: 20, right: 20 }
      });

      yPos = (doc as any).lastAutoTable.finalY + 15;

      // --- Terms, Revisions, Signature ---
      const termsSpaceNeeded = 120; // Approximate space needed for the rest
      yPos = checkAndAddPage(yPos, termsSpaceNeeded);

      // Payment Terms
      doc.setFontSize(11);
      doc.text("Payment Terms:", 20, yPos);
      yPos += 8;
      doc.setFontSize(10);
      const paymentText = "A deposit of 50% is due upon acceptance of this quote. The remaining balance will be due upon project completion. Payment can be made via airtel or mtn mobile wallet through the following numbers - +260 772792882 or +260 761525239.";
      const splitPayment = doc.splitTextToSize(paymentText, 170);
      doc.text(splitPayment, 20, yPos);
      yPos += (splitPayment.length * 5) + 8; // Adjust spacing

      // Revisions & Validity
      doc.setFontSize(11);
      doc.text("Revisions & Validity:", 20, yPos);
      yPos += 8;
      doc.setFontSize(10);
      const revisionsText = `This quote includes only the specified tasks. Any additional tasks may result in additional charges. Please review this quote thoroughly. If you agree with the outlined project scope, deliverables, and costs, please sign below and return a copy to us. This quote is valid for 2 days, from ${today.toLocaleDateString()} to ${expiryDate.toLocaleDateString()}.`;
      const splitRevisions = doc.splitTextToSize(revisionsText, 170);
      doc.text(splitRevisions, 20, yPos);
      yPos += (splitRevisions.length * 5) + 8;

      // Thank you note
      yPos = checkAndAddPage(yPos, 40); // Check space before signature
      const thankYouText = "Thank you for considering us for your project. We look forward to working with you.";
      const splitThankYou = doc.splitTextToSize(thankYouText, 170);
      doc.text(splitThankYou, 20, yPos);
      yPos += (splitThankYou.length * 5) + 16; // More space before signature

      // Signature
      doc.text("Best Regards,", 20, yPos);
      yPos += 8;
      doc.text("Techsphere Technologies", 20, yPos);

      // Add comments if any (on a new page)
      if (comments) {
        doc.addPage();
        doc.setFontSize(12);
        doc.text("Additional Comments:", 20, 20);
        doc.setFontSize(10);
        // Split long comments to fit on the page
        const splitComments = doc.splitTextToSize(comments, 170); // Use 170 width margin
        doc.text(splitComments, 20, 30);
      }

      // --- Generate Output ---
      console.log("PDF generation completed successfully");
      return doc.output('datauristring'); // Generate base64 string of the PDF

    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        title: "PDF Generation Error",
        description: `An error occurred while creating the PDF: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
      return ""; // Return empty string on failure
    }
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
                  <Label htmlFor="discount">Discount (%) - Max 20%</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="20"
                    placeholder="Enter discount percentage (0-20%)"
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