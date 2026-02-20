import { Phone, MapPin, Clock, Shield } from "lucide-react";
import logo from "@/assets/xcel-logo.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Xcel Locksmith" className="h-16 w-auto mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cleveland's most trusted 24/7 locksmith. Licensed, insured, and committed to transparent pricing.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Residential Locksmith</li>
              <li>Commercial Locksmith</li>
              <li>Automotive Locksmith</li>
              <li>Emergency Lockouts</li>
              <li>Lock Rekeying</li>
              <li>Key Duplication</li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cleveland & East Cleveland</li>
              <li>Lakewood & Westlake</li>
              <li>Parma & Strongsville</li>
              <li>Beachwood & Euclid</li>
              <li>Lorain & Elyria</li>
              <li>+ 14 more cities</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contact Us 24/7</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+12165551234" className="flex items-center gap-2 text-accent font-semibold hover:text-red-glow transition-colors">
                <Phone className="w-4 h-4" /> (216) 555-1234
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Cleveland, OH & surrounding areas</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" /> Open 24/7/365
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" /> Licensed & Insured
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Xcel Locksmith. All rights reserved. Licensed in the State of Ohio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
