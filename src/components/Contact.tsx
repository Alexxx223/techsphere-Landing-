
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Message sent successfully. We'll be in touch shortly!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 bg-richblack">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-teal/5 filter blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/5 filter blur-[120px]"></div>
      </div>
      
      <div className="section-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-white bg-white/5 backdrop-blur-sm mb-6">
              Contact Us
            </span>
            
            <h2 className="heading-lg mb-6">
              Get in <span className="text-teal">Touch</span>
            </h2>
            
            <p className="subheading max-w-2xl mx-auto">
              Feel free to reach out to us! We're here to assist with any inquiries or help transform your digital presence.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Our Address</h3>
                  <p className="text-white/70">Lusaka, Zambia</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-cyan" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Email Us</h3>
                  <p className="text-white/70">techspheretechnologies140@gmail.com</p>
                </div>
                
                <div className="glassmorphism rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Call Us</h3>
                  <p className="text-white/70">+260 772792882</p>
                </div>
              </div>
              
              <div className="glassmorphism rounded-xl p-8 mt-6">
                <h3 className="text-xl font-medium text-white mb-6">We'd love to hear from you</h3>
                <p className="text-white/70 mb-8">
                  Let us know how we can help with your business needs. 
                  Whether you're interested in our services, partnership opportunities, 
                  or just want to say hello, we're here for you.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <span className="text-white/70">Available 24/7 for urgent inquiries</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4">
                      <svg className="h-5 w-5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-white/70">100% secure communication</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-right">
              <div className="glassmorphism rounded-xl p-8 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200 text-white placeholder-white/30"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200 text-white placeholder-white/30"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200 text-white placeholder-white/30"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all duration-200 text-white placeholder-white/30"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full px-6 py-3 bg-gradient-to-r from-teal to-cyan text-white font-medium rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  
                  <p className="text-center text-white/50 text-sm">
                    We'll get back to you within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
