import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Wrench, Cpu, HardDrive, Monitor, Star } from 'lucide-react';
import HexagonalBackground from '@/components/ui/HexagonalBackground';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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

  const galleryImages = [
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/7c33059d-0dbd-408f-944f-e541ec29b44a.jpg',
      alt: 'Computer repair service center workshop with professional technicians',
    },
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/fe1b7edc-c44d-4cd2-a327-939c975bcf65.jpg',
      alt: 'Technician repairing laptop computer',
    },
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/39a6087d-e824-4290-a3da-c4d2a9b8abb0.jpg',
      alt: 'Laptop motherboard chip level repair and BGA soldering',
    },
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/639bc92d-0a89-45b2-bcb6-05cdea20ad69.jpg',
      alt: 'Computer hardware diagnostic testing equipment',
    },
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/b5f8c369-1c43-4de7-8a4b-91050e69f458.jpg',
      alt: 'Data recovery and hard drive repair services',
    },
    {
      url: 'https://miaoda-site-img.s3cdn.medo.dev/images/595362cd-3f45-44a4-9a61-91a86ad57113.jpg',
      alt: 'Electronics repair workshop with professional tools',
    },
  ];

  return (
    <div className="flex flex-col relative">
      {/* Hexagonal Background */}
      <HexagonalBackground />
      
      {/* Hero Section */}
      <section className="relative py-12 xl:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/30 to-transparent" />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              <Star className="h-3 w-3 mr-1 fill-cyan-400 text-cyan-400" />
              Trusted Since 2008
            </Badge>
            <h1 className="text-3xl xl:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              Expert Computer & Laptop Repair Services in Coimbatore
            </h1>
            <p className="text-base xl:text-xl text-cyan-100/80">
              17+ years of trusted service. Professional repairs, genuine parts, and doorstep service available.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50">
                <Link to="/booking">Book a Repair</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 xl:py-12 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container px-4">
          <div className="grid grid-cols-2 xl:grid-cols-6 gap-4 xl:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-sm xl:text-base">
                <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="font-medium text-cyan-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 xl:py-20 relative z-10">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 text-white">Our Core Services</h2>
            <p className="text-cyan-100/70 max-w-2xl mx-auto">
              We provide comprehensive computer and laptop repair services with expert technicians and genuine parts
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg hover:shadow-cyan-500/20 transition-all bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-cyan-100/60">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              <Link to="/services">View All Services & Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 xl:py-20 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl xl:text-4xl font-bold mb-4 text-white">Why Choose Cyberdoctor?</h2>
              <p className="text-cyan-100/70">
                Your trusted partner for all computer and laptop repair needs in Coimbatore
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30">
                  <CheckCircle className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">17+ Years Experience</h3>
                <p className="text-cyan-100/60">
                  Serving Coimbatore since 2008 with expert repair services
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30">
                  <Star className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">4.9/5 Rating</h3>
                <p className="text-cyan-100/60">
                  1000+ reviews from satisfied customers
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30">
                  <Wrench className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Expert Technicians</h3>
                <p className="text-cyan-100/60">
                  Certified professionals with chip-level repair expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section with Gallery */}
      <section className="py-12 xl:py-20 relative z-10">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl xl:text-4xl font-bold mb-4 text-white">About Us</h2>
            <p className="text-cyan-100/70 max-w-2xl mx-auto">
              Take a look inside our state-of-the-art service center where our expert technicians work with precision and care
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                        <CardContent className="p-0">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-[400px] xl:h-[500px] object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-slate-900/80 border-cyan-500/50 text-cyan-400 hover:bg-slate-800" />
              <CarouselNext className="right-2 bg-slate-900/80 border-cyan-500/50 text-cyan-400 hover:bg-slate-800" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 xl:py-20 relative z-10">
        <div className="container px-4">
          <Card className="bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            <CardContent className="p-8 xl:p-12 text-center space-y-6">
              <h2 className="text-2xl xl:text-4xl font-bold">Ready to Fix Your Computer?</h2>
              <p className="text-lg xl:text-xl opacity-90 max-w-2xl mx-auto">
                Book an appointment today and get your device repaired by our expert technicians. 
                In-store or doorstep service available.
              </p>
              <div className="flex flex-col xl:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" asChild className="bg-white text-cyan-600 hover:bg-cyan-50">
                  <Link to="/booking">Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
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
