import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStatistics, getAppointments } from '@/db/api';
import { Calendar, MessageSquare, Wrench, Clock } from 'lucide-react';
import type { Appointment } from '@/types/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalAppointments: 0, totalReviews: 0, totalServices: 0 });
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, appointmentsData] = await Promise.all([
        getStatistics(),
        getAppointments(),
      ]);
      setStats(statsData);
      setRecentAppointments(appointmentsData.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to the admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32 bg-muted" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-20 bg-muted" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                <p className="text-xs text-muted-foreground mt-1">All time bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReviews}</div>
                <p className="text-xs text-muted-foreground mt-1">Customer feedback</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalServices}</div>
                <p className="text-xs text-muted-foreground mt-1">Available services</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full bg-muted" />
              ))}
            </div>
          ) : recentAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No appointments yet</p>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col xl:flex-row xl:items-center xl:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{appointment.customer_name}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                    </p>
                  </div>
                  <div className="mt-2 xl:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
