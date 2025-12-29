import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getServices, createAppointment } from '@/db/api';
import type { Service, LocationType } from '@/types/types';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function BookingPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_address: '',
    service_id: '',
    service_name: '',
    appointment_date: '',
    appointment_time: '',
    location_type: 'in-store' as LocationType,
    notes: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    setFormData({
      ...formData,
      service_id: serviceId,
      service_name: service?.name || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.customer_phone || !formData.service_name || 
        !formData.appointment_date || !formData.appointment_time) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.location_type === 'doorstep' && !formData.customer_address) {
      toast({
        title: 'Error',
        description: 'Address is required for doorstep service',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await createAppointment({
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || undefined,
        customer_address: formData.customer_address || undefined,
        service_id: formData.service_id || undefined,
        service_name: formData.service_name,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        location_type: formData.location_type,
        notes: formData.notes || undefined,
      });

      setSubmitted(true);
      toast({
        title: 'Success',
        description: 'Your appointment has been booked successfully!',
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to book appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Appointment Booked!</h2>
              <p className="text-muted-foreground">
                Thank you for booking with Cyberdoctor. We will contact you shortly to confirm your appointment.
              </p>
            </div>
            <div className="space-y-2 text-sm text-left bg-muted/50 p-4 rounded-lg">
              <p><strong>Service:</strong> {formData.service_name}</p>
              <p><strong>Date:</strong> {new Date(formData.appointment_date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {formData.appointment_time}</p>
              <p><strong>Location:</strong> {formData.location_type === 'in-store' ? 'In-Store' : 'Doorstep Service'}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate('/')}>Back to Home</Button>
              <Button variant="outline" onClick={() => {
                setSubmitted(false);
                setFormData({
                  customer_name: '',
                  customer_phone: '',
                  customer_email: '',
                  customer_address: '',
                  service_id: '',
                  service_name: '',
                  appointment_date: '',
                  appointment_time: '',
                  location_type: 'in-store',
                  notes: '',
                });
              }}>
                Book Another Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 xl:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary">Book Appointment</Badge>
            <h1 className="text-3xl xl:text-5xl font-bold">Schedule Your Repair</h1>
            <p className="text-base xl:text-xl text-muted-foreground">
              Fill in the details below and we'll get your device fixed in no time
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 xl:py-20">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Please provide your information and preferred appointment time</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customer Information</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer_name">Full Name *</Label>
                        <Input
                          id="customer_name"
                          value={formData.customer_name}
                          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer_phone">Phone Number *</Label>
                        <Input
                          id="customer_phone"
                          type="tel"
                          value={formData.customer_phone}
                          onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer_email">Email (Optional)</Label>
                      <Input
                        id="customer_email"
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Service Details
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="service">Select Service *</Label>
                      <Select value={formData.service_id} onValueChange={handleServiceChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - Starting from ₹{service.price_starting_from?.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Appointment Date & Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Appointment Schedule
                    </h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointment_date">Date *</Label>
                        <Input
                          id="appointment_date"
                          type="date"
                          value={formData.appointment_date}
                          onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointment_time">Time *</Label>
                        <Input
                          id="appointment_time"
                          type="time"
                          value={formData.appointment_time}
                          onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Type */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Service Location
                    </h3>
                    <RadioGroup
                      value={formData.location_type}
                      onValueChange={(value) => setFormData({ ...formData, location_type: value as LocationType })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-store" id="in-store" />
                        <Label htmlFor="in-store" className="cursor-pointer">In-Store Service</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doorstep" id="doorstep" />
                        <Label htmlFor="doorstep" className="cursor-pointer">Home Doorstep Service</Label>
                      </div>
                    </RadioGroup>

                    {formData.location_type === 'doorstep' && (
                      <div className="space-y-2">
                        <Label htmlFor="customer_address">Service Address *</Label>
                        <Textarea
                          id="customer_address"
                          value={formData.customer_address}
                          onChange={(e) => setFormData({ ...formData, customer_address: e.target.value })}
                          placeholder="Enter your complete address"
                          rows={3}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific issues or requirements?"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
