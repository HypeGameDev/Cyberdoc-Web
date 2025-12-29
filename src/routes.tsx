import type { ReactNode } from 'react';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
    visible: true,
  },
  {
    name: 'Services',
    path: '/services',
    element: <ServicesPage />,
    visible: true,
  },
  {
    name: 'Book Appointment',
    path: '/booking',
    element: <BookingPage />,
    visible: true,
  },
  {
    name: 'Reviews',
    path: '/reviews',
    element: <ReviewsPage />,
    visible: true,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />,
    visible: true,
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminLayout />,
    visible: false,
    children: [
      {
        name: 'Dashboard',
        path: '',
        element: <AdminDashboardPage />,
      },
      {
        name: 'Appointments',
        path: 'appointments',
        element: <AdminAppointmentsPage />,
      },
      {
        name: 'Reviews',
        path: 'reviews',
        element: <AdminReviewsPage />,
      },
      {
        name: 'Content',
        path: 'content',
        element: <AdminContentPage />,
      },
      {
        name: 'Users',
        path: 'users',
        element: <AdminUsersPage />,
      },
    ],
  },
];

export default routes;
