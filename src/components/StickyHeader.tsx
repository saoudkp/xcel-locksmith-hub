import { Phone, Menu, X, Clock, Zap, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/xcel-logo.jpeg";

const PHONE_NUMBER = "tel:+12165551234";

const StickyHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("xcel-theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("xcel-theme", dark ? "dark" : "light");
  }, [dark]);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#vehicle-verifier", label: "Vehicle Check" },
    { href: "#quote", label: "Free Quote" },
    { href: "#reviews", label: "Reviews" },
    { href: "#service-area", label: "Service Area" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Emergency banner - mobile */}
      <div className="bg-cta-red text-white text-center py-1.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 md:hidden">
        <Zap className="w-4 h-4" />
        <span>We Arrive in 20–30 Minutes!</span>
      </div>

      {/* Main header with glass */}
      <div className="glass-header">
        <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Xcel Locksmith" className="h-14 md:h-20 w-auto rounded-lg dark:mix-blend-lighten transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-foreground/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop ETA + CTA + Theme */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg glass-card hover:bg-foreground/5 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2 text-accent font-semibold text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>20–30 Min</span>
            </div>
            <a
              href={PHONE_NUMBER}
              className="touch-target flex items-center gap-2 bg-cta-red hover:bg-cta-red-glow text-white font-bold px-6 py-3 rounded-xl transition-all animate-pulse-glow-red hover:scale-105 duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile CTA + Theme + Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg glass-card"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-foreground" />}
            </button>
            <a
              href={PHONE_NUMBER}
              className="touch-target flex items-center gap-2 bg-cta-red hover:bg-cta-red-glow text-white font-bold px-4 py-3 rounded-xl animate-pulse-glow-red text-sm"
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
            className="md:hidden glass-card-strong border-t border-border"
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
                  className="touch-target flex items-center px-4 py-3 text-foreground font-medium hover:bg-foreground/5 rounded-xl transition-colors"
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
