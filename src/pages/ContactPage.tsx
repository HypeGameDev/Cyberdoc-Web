import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Thank you for contacting us! We will get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919952274058';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919952274058?text=Hi, I would like to inquire about your services', '_blank');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 xl:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary">Contact Us</Badge>
            <h1 className="text-3xl xl:text-5xl font-bold">Get in Touch</h1>
            <p className="text-base xl:text-xl text-muted-foreground">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Call us directly</p>
                <Button variant="outline" className="w-full" onClick={handleCallClick}>
                  <Phone className="mr-2 h-4 w-4" />
                  +91 99522 74058
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Chat with us</p>
                <Button variant="outline" className="w-full" onClick={handleWhatsAppClick}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Send us an email</p>
                <a
                  href="mailto:info@cyberdoctor.com"
                  className="text-primary hover:underline text-sm"
                >
                  info@cyberdoctor.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mon-Sat: 9:00 AM - 8:00 PM<br />
                  Sun: 10:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Location and Map */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Saravanampatti, Coimbatore, Tamil Nadu, India
                  </p>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8826!2d77.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Cyberdoctor Location"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                  <p className="mb-4 opacity-90">
                    Call us now or chat with us on WhatsApp for quick support
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button variant="secondary" onClick={handleCallClick}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
