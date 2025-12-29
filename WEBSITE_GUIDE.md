# Cyberdoctor Computer & Laptop Service Center Website

## 🎉 Website Overview

A professional, full-featured business website for Cyberdoctor Computer Service Center in Coimbatore. The website includes a complete customer-facing interface and a powerful admin dashboard for managing all aspects of the business.

## ✨ Key Features

### Public Features
- **Home Page**: Hero section with CTAs, service overview, and trust badges highlighting 17+ years of experience
- **Services Page**: Detailed service listings with pricing table and feature descriptions
- **Appointment Booking**: Complete booking system with date/time selection, service location options (in-store or doorstep)
- **Reviews Page**: Customer testimonials with 4.9/5 rating display and review submission form
- **Contact Page**: Google Maps integration, click-to-call, WhatsApp chat widget, and contact form
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

### Admin Dashboard
- **Dashboard Overview**: Statistics and recent appointments at a glance
- **Appointments Management**: View, update status, and manage all customer bookings
- **Reviews Management**: Approve/reject reviews, manage customer feedback
- **Content Management**: Edit website content, service descriptions, and pricing
- **User Management**: Manage user roles (admin/user)
- **Secure Authentication**: Username-based login with role-based access control

### Technical Features
- **Supabase Backend**: Complete database with RLS policies for security
- **Image Upload**: Support for service images with auto-compression (1MB limit)
- **SEO Optimized**: Meta tags for search engines and social media
- **WhatsApp Integration**: Floating chat button and direct messaging
- **Google Maps**: Embedded map showing Saravanampatti location
- **Real-time Updates**: Instant data synchronization across the platform

## 🚀 Getting Started

### First Time Setup

1. **Register the First Admin Account**
   - Navigate to the website
   - Click "Sign In" in the header
   - Go to the "Sign Up" tab
   - Create an account with:
     - Username (letters, numbers, and underscores only)
     - Password (minimum 6 characters)
   - **Important**: The first user to register automatically becomes an admin
   - You'll be logged in automatically after registration

2. **Access Admin Dashboard**
   - After logging in as admin, you'll see "Admin Panel" button in the header
   - Click it to access the admin dashboard
   - From here you can manage all aspects of the website

### Admin Dashboard Features

#### Managing Appointments
- View all customer bookings
- Update appointment status (Pending → Confirmed → Completed)
- See customer details, service type, and location preferences
- Delete appointments if needed

#### Managing Reviews
- View all submitted reviews (approved and pending)
- Toggle approval status with a simple switch
- Delete inappropriate reviews
- Reviews only appear on the public site when approved

#### Managing Content
- Edit hero section text and CTA buttons
- Update contact information (phone, email, address, hours)
- Modify service descriptions and pricing
- Changes reflect immediately on the website

#### Managing Users
- View all registered users
- Change user roles (User ↔ Admin)
- Monitor user registration dates

## 📱 Customer Journey

### Booking an Appointment
1. Customer visits the website
2. Clicks "Book a Repair" or navigates to "Book Appointment"
3. Fills in the form:
   - Personal information (name, phone, email)
   - Selects service from dropdown
   - Chooses date and time
   - Selects location (In-Store or Doorstep Service)
   - Adds any additional notes
4. Submits the form
5. Receives confirmation message
6. Admin sees the booking in the dashboard

### Leaving a Review
1. Customer navigates to "Reviews" page
2. Clicks "Leave a Review" button
3. Fills in:
   - Name
   - Service type (optional)
   - Star rating (1-5)
   - Review text
4. Submits the review
5. Review goes to admin for approval
6. Once approved, appears on the public reviews page

### Contacting the Business
Multiple ways to reach out:
- **Phone**: Click-to-call button (+91 99522 74058)
- **WhatsApp**: Floating chat button (bottom right) or contact page
- **Email**: info@cyberdoctor.com
- **Contact Form**: Fill and submit on contact page
- **Visit**: View location on Google Maps

## 🎨 Design & Branding

### Color Scheme
- **Primary**: Deep Blue (#1E3A8A) - Professional and trustworthy
- **Secondary**: Slate Grey (#475569) - Modern and clean
- **Background**: White with subtle accents
- **Fully supports dark mode** for user preference

### Typography
- Clean sans-serif fonts for readability
- Clear hierarchy with bold headings
- Optimized for both desktop and mobile reading

### Visual Style
- Modern, tech-focused aesthetic
- Card-based layouts for easy scanning
- Professional iconography
- Rounded corners (8px) for friendly appearance
- Subtle shadows for depth

## 🔐 Security Features

### Authentication
- Username + password authentication
- Secure password hashing
- Session management
- Auto-login after signup

### Authorization
- Role-based access control (Admin/User)
- Protected admin routes
- Row Level Security (RLS) policies in database
- First user automatically becomes admin

### Data Protection
- Secure API endpoints
- Input validation on all forms
- SQL injection prevention
- XSS protection

## 📊 Database Structure

### Tables
- **profiles**: User accounts with roles
- **services**: Service listings with pricing
- **appointments**: Customer bookings
- **reviews**: Customer testimonials
- **site_content**: Editable website content

### Storage
- **service_images**: Bucket for service-related images
- Auto-compression for files over 1MB
- Public read access, authenticated write access

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Build Tool**: Vite
- **Routing**: React Router v6

## 📞 Contact Information

**Business Details:**
- **Name**: Cyberdoctor Computer & Laptop Service Center
- **Phone**: +91 99522 74058
- **Email**: info@cyberdoctor.com
- **Location**: Saravanampatti, Coimbatore, Tamil Nadu
- **Hours**: 
  - Mon-Sat: 9:00 AM - 8:00 PM
  - Sun: 10:00 AM - 6:00 PM

## 🎯 SEO Keywords

The website is optimized for:
- Laptop service in Coimbatore
- Computer repair Saravanampatti
- Data recovery services
- Chip-level motherboard repair
- Desktop servicing
- OS installation
- Doorstep computer service

## 📝 Important Notes

1. **First User is Admin**: The very first person to register on the website automatically becomes an admin. Make sure you register first!

2. **Review Approval**: All customer reviews require admin approval before appearing on the public website. This helps maintain quality and filter inappropriate content.

3. **Appointment Notifications**: Currently, appointments are stored in the database. Admins should regularly check the dashboard for new bookings.

4. **Content Updates**: Any changes made in the admin content management section reflect immediately on the public website.

5. **Image Uploads**: When uploading images, they are automatically compressed if over 1MB to ensure fast loading times.

6. **Mobile Responsive**: The entire website, including the admin dashboard, works perfectly on mobile devices.

## 🚀 Next Steps

1. **Register your admin account** (first user)
2. **Customize content** in the admin dashboard
3. **Add service images** if needed
4. **Test the booking flow** to ensure everything works
5. **Share the website** with your customers!

## 💡 Tips for Success

- **Respond quickly** to appointment requests to build trust
- **Encourage satisfied customers** to leave reviews
- **Keep service pricing updated** in the admin panel
- **Monitor the dashboard regularly** for new bookings
- **Approve genuine reviews** to build social proof
- **Use the WhatsApp integration** for quick customer communication

---

**Built with ❤️ for Cyberdoctor Computer Service Center**

*Serving Coimbatore with excellence since 2008*
