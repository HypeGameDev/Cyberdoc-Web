import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getAppointments, updateAppointment, deleteAppointment } from '@/db/api';
import type { Appointment, AppointmentStatus } from '@/types/types';
import { Calendar, Phone, Mail, MapPin, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: AppointmentStatus) => {
    try {
      await updateAppointment(id, { status });
      setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt)));
      toast({
        title: 'Success',
        description: 'Appointment status updated',
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to update appointment',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((apt) => apt.id !== id));
      toast({
        title: 'Success',
        description: 'Appointment deleted',
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete appointment',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-2">Manage customer appointments</p>
        </div>
        <Badge variant="secondary">{appointments.length} Total</Badge>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-24 w-full bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No appointments yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                  <CardTitle className="text-xl">{appointment.customer_name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={appointment.status}
                      onValueChange={(value) => handleStatusChange(appointment.id, value as AppointmentStatus)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this appointment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(appointment.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Service</p>
                        <p className="text-sm text-muted-foreground">{appointment.service_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{appointment.customer_phone}</p>
                      </div>
                    </div>
                    {appointment.customer_email && (
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{appointment.customer_email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.location_type === 'in-store' ? 'In-Store' : 'Doorstep Service'}
                        </p>
                        {appointment.customer_address && (
                          <p className="text-xs text-muted-foreground mt-1">{appointment.customer_address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(appointment.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
