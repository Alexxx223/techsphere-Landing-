
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PricingCard = ({ price, title, description, features }: { price: string; title: string; description: string; features: string[] }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleOrderClick = () => {
    setOpen(true);
  };

  const handleConfirmOrder = () => {
    // Construct the email parameters
    const recipient = "techspheretechnologies1400@gmail.com";
    const subject = encodeURIComponent(`Order: ${title} Package`);
    const body = encodeURIComponent(
      `Dear TechSphere Team,\n\n` +
      `I am interested in ordering the ${title} package (${price}).\n\n` +
      `Please find my details below:\n\n` +
      `Name: [Your Name]\n` +
      `Phone Number: [Your Phone Number]\n` +
      `Company Name (if applicable): [Company Name]\n` +
      `Best time to contact: [Preferred Contact Time]\n\n` +
      `Additional information or requirements:\n` +
      `[Please add any other information that might help us serve you better]\n\n` +
      `Looking forward to working with you.\n\n` +
      `Best regards,\n` +
      `[Your Name]`
    );

    // Create the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open the email client
    window.location.href = mailtoLink;
    
    // Close the dialog
    setOpen(false);
    
    // Show a toast notification
    toast({
      title: "Email client opened",
      description: "Please complete your order details in the email.",
    });
  };

  return (
    <div className="glassmorphism rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <div className="mb-4">
          <span className="text-2xl font-bold text-white">{price}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-teal/20 mr-2">
                <Check className="h-4 w-4 text-teal" />
              </span>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-gradient-to-r from-teal to-cyan hover:opacity-90 text-white"
                onClick={handleOrderClick}
              >
                Order Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Your Order</DialogTitle>
                <DialogDescription>
                  You are about to order the {title} package for {price}.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>
                  This will open your email client with a pre-filled message to our team. 
                  You'll need to provide some additional details and send the email to complete your order.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleConfirmOrder}
                  className="bg-gradient-to-r from-teal to-cyan hover:opacity-90"
                >
                  Proceed to Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingPlans = [
    {
      price: "K1,499",
      title: "Start Up Package",
      description: "Perfect for small businesses to establish an online presence.",
      features: [
        "Full Logo Design",
        "2 Facebook Size Posters",
        "Business Card Design"
      ]
    },
    {
      price: "K2,499",
      title: "Business Package",
      description: "Comprehensive branding solution for growing businesses.",
      features: [
        "Full Logo Design",
        "5 Social Media Posters",
        "Business Card Design",
        "Letterhead Design"
      ]
    },
    {
      price: "K3,999",
      title: "Premium Package",
      description: "Complete digital presence for established businesses.",
      features: [
        "Full Logo Design",
        "10 Social Media Posters",
        "Business Card Design",
        "Letterhead Design",
        "Website Design"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-richblack">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="heading-lg mb-6">Pricing Plans</h2>
          <p className="subheading max-w-3xl mx-auto">
            Choose the perfect package that fits your business needs and budget.
            Our transparent pricing ensures you get the best value for your investment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              price={plan.price}
              title={plan.title}
              description={plan.description}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;