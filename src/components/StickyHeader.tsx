import { Phone, Menu, X, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/xcel-logo.jpeg";

const PHONE_NUMBER = "tel:+12165551234";

const StickyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      {/* Emergency banner - mobile */}
      <div className="bg-accent/90 text-accent-foreground text-center py-1.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 md:hidden">
        <Clock className="w-4 h-4" />
        <span>We Arrive in 20–30 Minutes!</span>
      </div>

      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Xcel Locksmith" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-silver-light">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#vehicle-verifier" className="hover:text-foreground transition-colors">Vehicle Check</a>
          <a href="#quote" className="hover:text-foreground transition-colors">Free Quote</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#service-area" className="hover:text-foreground transition-colors">Service Area</a>
        </nav>

        {/* Desktop ETA + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-accent font-semibold text-sm">
            <Clock className="w-4 h-4" />
            <span>20–30 Min Response</span>
          </div>
          <a
            href={PHONE_NUMBER}
            className="touch-target flex items-center gap-2 bg-accent hover:bg-red-glow text-accent-foreground font-bold px-6 py-3 rounded-lg transition-all animate-pulse-glow"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
        </div>

        {/* Mobile CTA + Menu */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={PHONE_NUMBER}
            className="touch-target flex items-center gap-2 bg-accent hover:bg-red-glow text-accent-foreground font-bold px-4 py-3 rounded-lg animate-pulse-glow text-sm"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="touch-target flex items-center justify-center p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden glass-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {[
              { href: "#services", label: "Services" },
              { href: "#vehicle-verifier", label: "Vehicle Check" },
              { href: "#quote", label: "Free Quote" },
              { href: "#reviews", label: "Reviews" },
              { href: "#faq", label: "FAQ" },
              { href: "#service-area", label: "Service Area" },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="touch-target flex items-center px-4 py-3 text-foreground font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default StickyHeader;
