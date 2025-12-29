import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Wrench, Cpu, HardDrive, Monitor, Star } from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: 'Laptop Repair',
      description: 'Complete laptop repair services including screen, keyboard, and battery replacement',
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: 'Desktop Servicing',
      description: 'Full desktop computer servicing, maintenance, and component upgrades',
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: 'Chip-level Repair',
      description: 'Advanced motherboard repair at component level with BGA reballing',
    },
    {
      icon: <HardDrive className="h-8 w-8 text-primary" />,
      title: 'Data Recovery',
      description: 'Professional data recovery from damaged or corrupted storage devices',
    },
  ];

  const features = [
    '17+ Years of Experience',
    'Expert Technicians',
    'Doorstep Service Available',
    'Genuine Parts',
    'Quick Turnaround',
    'Warranty on Repairs',
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-12 xl:py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
              Trusted Since 2008
            </Badge>
            <h1 className="text-3xl xl:text-5xl font-bold tracking-tight">
              Expert Computer & Laptop Repair Services in Coimbatore
            </h1>
            <p className="text-base xl:text-xl text-muted-foreground">
              17+ years of trusted service. Professional repairs, genuine parts, and doorstep service available.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/booking">Book a Repair</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 xl:py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 xl:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-sm xl:text-base">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive computer and laptop repair services with expert technicians and genuine parts
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View All Services & Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 xl:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl xl:text-4xl font-bold mb-4">Why Choose Cyberdoctor?</h2>
              <p className="text-muted-foreground">
                Your trusted partner for all computer and laptop repair needs in Coimbatore
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">17+ Years Experience</h3>
                <p className="text-muted-foreground">
                  Serving Coimbatore since 2008 with expert repair services
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">4.9/5 Rating</h3>
                <p className="text-muted-foreground">
                  Highly rated by hundreds of satisfied customers
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Expert Technicians</h3>
                <p className="text-muted-foreground">
                  Certified professionals with chip-level repair expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 xl:p-12 text-center space-y-6">
              <h2 className="text-2xl xl:text-4xl font-bold">Ready to Fix Your Computer?</h2>
              <p className="text-lg xl:text-xl opacity-90 max-w-2xl mx-auto">
                Book an appointment today and get your device repaired by our expert technicians. 
                In-store or doorstep service available.
              </p>
              <div className="flex flex-col xl:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/booking">Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
