import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container px-4 py-8 xl:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Cyberdoctor</h3>
            <p className="text-sm text-muted-foreground">
              Expert Computer & Laptop Repair Services in Coimbatore since 2008. 17+ years of trusted service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href="tel:+919952274058" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 99522 74058
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href="mailto:info@cyberdoctor.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@cyberdoctor.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Saravanampatti, Coimbatore, Tamil Nadu
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Business Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="text-muted-foreground">
                  <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Cyberdoctor Computer & Laptop Service Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
