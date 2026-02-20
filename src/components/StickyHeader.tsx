import { Phone, Menu, X, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/xcel-logo.jpeg";

const PHONE_NUMBER = "tel:+12165551234";

const StickyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#vehicle-verifier", label: "Vehicle Check" },
    { href: "#quote", label: "Free Quote" },
    { href: "#reviews", label: "Reviews" },
    { href: "#service-area", label: "Service Area" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Emergency banner - mobile */}
      <div className="bg-accent/90 text-accent-foreground text-center py-1.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 md:hidden">
        <Zap className="w-4 h-4" />
        <span>We Arrive in 20–30 Minutes!</span>
      </div>

      {/* Main header with glass */}
      <div className="glass-header">
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Xcel Locksmith" className="h-14 md:h-20 w-auto rounded-lg mix-blend-lighten transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-silver-light hover:text-foreground transition-all duration-300 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop ETA + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 text-accent font-semibold text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>20–30 Min</span>
            </div>
            <a
              href={PHONE_NUMBER}
              className="touch-target flex items-center gap-2 bg-accent hover:bg-blue-glow text-accent-foreground font-bold px-6 py-3 rounded-xl transition-all animate-pulse-glow hover:scale-105 duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile CTA + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PHONE_NUMBER}
              className="touch-target flex items-center gap-2 bg-accent hover:bg-blue-glow text-accent-foreground font-bold px-4 py-3 rounded-xl animate-pulse-glow text-sm"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="touch-target flex items-center justify-center p-2 text-foreground glass-card rounded-lg"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card-strong border-t border-white/5"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="touch-target flex items-center px-4 py-3 text-foreground font-medium hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default StickyHeader;
