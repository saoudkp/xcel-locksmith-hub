import { Phone, Shield, Clock, Star, Award, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { defaultBrand } from "@/data/siteConfig";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-page" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(217,91%,60%,0.08)_0%,_transparent_60%)]" />

      {/* Parallax floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

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
              <div key={i} className="skeu-badge px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold text-foreground">
                <badge.icon className="w-4 h-4 text-accent" />
                {badge.text}
              </div>
            ))}
          </motion.div>

          {/* Headline — unified font-display for professional consistency */}
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

          {/* Response time guarantee - neumorphic */}
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
      </div>
    </section>
  );
};

export default HeroSection;
