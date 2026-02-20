import { Phone, Shield, Clock, Star, Award, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const PHONE_NUMBER = "tel:+12165551234";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-page" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(356,82%,50%,0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
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
              <div key={i} className="glass-card px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-silver-light">
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
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-foreground">Cleveland's Fastest</span>
            <br />
            <span className="text-accent">24/7 Emergency Locksmith</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
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
            className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl mb-8 glow-red"
          >
            <Clock className="w-8 h-8 text-accent" />
            <div className="text-left">
              <p className="text-accent font-display text-2xl font-bold">20–30 Minute Response</p>
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
              href={PHONE_NUMBER}
              className="touch-target flex items-center justify-center gap-3 bg-accent hover:bg-red-glow text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl transition-all animate-pulse-glow"
            >
              <Phone className="w-6 h-6" />
              Call (216) 555-1234 Now
            </a>
            <a
              href="#quote"
              className="touch-target flex items-center justify-center gap-2 glass-card hover:bg-secondary text-foreground font-semibold text-lg px-8 py-4 rounded-xl transition-all border border-border"
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
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <p className="text-accent font-display text-2xl font-bold">{item.price}+</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
