import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getServices } from '@/db/api';
import type { Service } from '@/types/types';
import { Monitor, Cpu, Wrench, HardDrive, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="h-10 w-10 text-primary" />,
  cpu: <Cpu className="h-10 w-10 text-primary" />,
  wrench: <Wrench className="h-10 w-10 text-primary" />,
  harddrive: <HardDrive className="h-10 w-10 text-primary" />,
  settings: <Settings className="h-10 w-10 text-primary" />,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
      toast({
        title: 'Error',
        description: 'Failed to load services',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes('laptop')) return iconMap.monitor;
    if (name.includes('desktop')) return iconMap.cpu;
    if (name.includes('motherboard') || name.includes('chip')) return iconMap.wrench;
    if (name.includes('data') || name.includes('recovery')) return iconMap.harddrive;
    if (name.includes('os') || name.includes('installation')) return iconMap.settings;
    return iconMap.settings;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 xl:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary">Our Services</Badge>
            <h1 className="text-3xl xl:text-5xl font-bold">Professional Computer Repair Services</h1>
            <p className="text-base xl:text-xl text-muted-foreground">
              Comprehensive repair solutions for all your computer and laptop needs with transparent pricing
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                    <Skeleton className="h-6 w-3/4 bg-muted" />
                    <Skeleton className="h-4 w-full bg-muted" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{getIcon(service.name)}</div>
                    <CardTitle className="text-xl xl:text-2xl">{service.name}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {service.price_starting_from && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{service.price_starting_from.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-12 xl:py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl xl:text-4xl font-bold mb-4">Service Pricing</h2>
              <p className="text-muted-foreground">
                Transparent pricing for all our services. Final cost may vary based on specific requirements.
              </p>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold">Service</th>
                        <th className="text-right p-4 font-semibold">Starting Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={2} className="p-4">
                            <Skeleton className="h-8 w-full bg-muted" />
                          </td>
                        </tr>
                      ) : (
                        services.map((service, index) => (
                          <tr key={service.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                            <td className="p-4">
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-lg font-bold text-primary">
                                ₹{service.price_starting_from?.toFixed(2) || 'Contact'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-6">
              * Prices are indicative and may vary based on the actual issue and parts required. 
              Contact us for a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 xl:p-12 text-center space-y-6">
              <h2 className="text-2xl xl:text-4xl font-bold">Need a Repair?</h2>
              <p className="text-lg xl:text-xl opacity-90 max-w-2xl mx-auto">
                Book an appointment now and get your device fixed by our expert technicians
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/booking">Book Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
