import { Phone, Shield, Clock, Star, Award, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { defaultBrand } from "@/data/siteConfig";
import HeroLockAnimation from "./HeroLockAnimation";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Mobile: standard hero (no scroll animation) */}
      <div className="md:hidden relative min-h-screen flex items-center pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-page" />
        <div className="container mx-auto px-4 relative z-10">
          <HeroContent />
        </div>
      </div>

      {/* Desktop: GSAP scroll-scrub lock animation */}
      <div className="hidden md:block relative">
        {/* The animation container drives 300vh of scroll */}
        <HeroLockAnimation />

        {/* Hero content overlaid on the sticky canvas */}
        <div className="absolute inset-0 pointer-events-none" style={{ height: "300vh" }}>
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-auto">
            <div className="container mx-auto px-4 relative z-10">
              <HeroContent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Shared hero content for both mobile and desktop */
const HeroContent = () => (
  <div className="max-w-4xl mx-auto text-center">
    {/* Trust badges row */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      {[
        { icon: Clock, text: "24/7 Service" },
        { icon: Shield, text: "Licensed & Insured" },
        { icon: Star, text: "5-Star Rated" },
        { icon: DollarSign, text: "No Hidden Fees" },
        { icon: Award, text: "Ohio Licensed" },
      ].map((badge, i) => (
        <div key={i} className="skeu-badge px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold text-foreground">
          <badge.icon className="w-4 h-4 text-accent" />
          {badge.text}
        </div>
      ))}
    </motion.div>

    {/* Headline */}
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="font-display font-extrabold tracking-tight mb-6 leading-[1.15] text-4xl sm:text-5xl md:text-6xl text-foreground"
    >
      Cleveland's Fastest<br />
      24/7 Emergency Locksmith
    </motion.h1>

    {/* Subheadline */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
    >
      Locked out? Keys lost? Need new locks? We handle residential, commercial & automotive
      locksmith emergencies across Cleveland and 24 surrounding cities.
      <strong className="text-foreground"> We arrive in 20–30 minutes.</strong>
    </motion.p>

    {/* Response time guarantee */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="inline-flex items-center gap-3 neu-card px-6 py-4 rounded-2xl mb-8"
    >
      <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
        <Clock className="w-7 h-7 text-accent" />
      </div>
      <div className="text-left">
        <p className="text-accent font-display text-2xl font-bold">{defaultBrand.responseTime} Response</p>
        <p className="text-sm text-muted-foreground">Guaranteed fast arrival, any time, any day</p>
      </div>
    </motion.div>

    {/* CTA buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <a
        href={defaultBrand.phoneNumber}
        className="touch-target flex items-center justify-center gap-3 skeu-cta-red text-white font-bold text-lg px-8 py-4 rounded-xl"
      >
        <Phone className="w-6 h-6" />
        Call {defaultBrand.phoneDisplay} Now
      </a>
      <a
        href="#quote"
        className="touch-target flex items-center justify-center gap-2 neu-card hover:bg-secondary text-foreground font-semibold text-lg px-8 py-4 rounded-xl transition-all"
      >
        Get a Free Quote
      </a>
    </motion.div>

    {/* Starting prices row */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
    >
      {[
        { label: "Residential", price: "$35" },
        { label: "Commercial", price: "$45" },
        { label: "Automotive", price: "$50" },
      ].map((item, i) => (
        <div key={i} className="neu-card rounded-xl p-4 text-center">
          <p className="text-accent font-display text-2xl font-bold">{item.price}+</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">{item.label}</p>
        </div>
      ))}
    </motion.div>
  </div>
);

export default HeroSection;
