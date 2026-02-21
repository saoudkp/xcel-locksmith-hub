import { useEffect, useRef, useState } from "react";
import { Phone, Shield, Clock, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { defaultBrand } from "@/data/siteConfig";
import HeroLockAnimation, { SCROLL_HEIGHT } from "./HeroLockAnimation";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Mobile: standard hero (no scroll animation) */}
      <div className="md:hidden relative min-h-screen flex items-end pb-12 pt-28">
        <div className="absolute inset-0 bg-gradient-page" />
        <div className="container mx-auto px-4 relative z-10">
          <HeroContentMobile />
        </div>
      </div>

      {/* Desktop: GSAP scroll-scrub lock animation */}
      <div className="hidden md:block relative">
        {/* The animation container — drives scroll */}
        <HeroLockAnimation />

        {/* Overlay + content pinned on top */}
        <div className="absolute inset-0" style={{ height: SCROLL_HEIGHT }}>
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end overflow-hidden">
            {/* Bottom gradient for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-[1]" />
            {/* Top subtle gradient */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/30 to-transparent pointer-events-none z-[1]" />

            {/* Hero content — scroll-driven staggered reveal */}
            <div className="relative z-[2] pb-10">
              <div className="container mx-auto px-4">
                <HeroContentDesktop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Desktop: cinematic bottom-aligned layout with staggered scroll reveal */
const HeroContentDesktop = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      // Progress from 0 → 1 over the first 1.2 viewports of scroll
      const p = Math.min(1, scrollY / (windowH * 1.2));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stagger function: each element appears at a different threshold
  const stagger = (index: number, total: number) => {
    const start = (index / total) * 0.6; // stagger starts spread across 0–0.6 of progress
    const localProgress = Math.max(0, Math.min(1, (progress - start) / 0.4));
    return {
      opacity: localProgress,
      transform: `translateY(${(1 - localProgress) * 30}px)`,
    };
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-8">
        {/* Left: headline + subtitle */}
        <div className="max-w-2xl">
          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-4" style={stagger(0, 6)}>
            {[
              { icon: Clock, text: "24/7" },
              { icon: Shield, text: "Licensed" },
              { icon: Star, text: "5-Star" },
              { icon: Award, text: "Ohio" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-foreground/90 bg-background/50 backdrop-blur-sm border border-border/30"
              >
                <badge.icon className="w-3 h-3 text-accent" />
                {badge.text}
              </div>
            ))}
          </div>

          <h1
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl lg:text-5xl xl:text-6xl text-foreground drop-shadow-lg"
            style={stagger(1, 6)}
          >
            Cleveland's Fastest<br />
            <span className="text-accent">24/7 Emergency</span> Locksmith
          </h1>

          <p
            className="text-sm lg:text-base text-foreground/70 max-w-lg mt-3 leading-relaxed drop-shadow-sm"
            style={stagger(2, 6)}
          >
            Locked out? We handle residential, commercial & automotive emergencies.
            <strong className="text-foreground"> 20–30 min arrival.</strong>
          </p>
        </div>

        {/* Right: CTA stack */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* Response badge */}
          <div
            className="flex items-center gap-3 bg-background/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/30"
            style={stagger(3, 6)}
          >
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-accent font-display text-lg font-bold">{defaultBrand.responseTime}</p>
              <p className="text-[10px] text-muted-foreground">Guaranteed response</p>
            </div>
          </div>

          {/* CTA buttons */}
          <a
            href={defaultBrand.phoneNumber}
            className="touch-target flex items-center justify-center gap-3 skeu-cta-red text-white font-bold text-base px-7 py-3.5 rounded-xl w-full"
            style={stagger(4, 6)}
          >
            <Phone className="w-5 h-5" />
            Call {defaultBrand.phoneDisplay}
          </a>
          <a
            href="#quote"
            className="touch-target flex items-center justify-center gap-2 bg-background/50 backdrop-blur-md hover:bg-background/70 text-foreground font-semibold px-7 py-3 rounded-xl transition-all border border-border/30 w-full text-center text-sm"
            style={stagger(4, 6)}
          >
            Get a Free Quote
          </a>

          {/* Prices row */}
          <div className="flex gap-2" style={stagger(5, 6)}>
            {[
              { label: "Residential", price: "$35" },
              { label: "Commercial", price: "$45" },
              { label: "Automotive", price: "$50" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-background/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center border border-border/20"
              >
                <p className="text-accent font-display text-base font-bold">{item.price}+</p>
                <p className="text-[9px] text-muted-foreground font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Mobile: compact version */
const HeroContentMobile = () => (
  <div className="max-w-lg mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 mb-6"
    >
      {[
        { icon: Clock, text: "24/7" },
        { icon: Shield, text: "Licensed" },
        { icon: Star, text: "5-Star" },
      ].map((badge, i) => (
        <div key={i} className="skeu-badge px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <badge.icon className="w-3 h-3 text-accent" />
          {badge.text}
        </div>
      ))}
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="font-display font-extrabold tracking-tight mb-4 leading-[1.1] text-3xl sm:text-4xl text-foreground"
    >
      Cleveland's Fastest<br />
      <span className="text-accent">24/7</span> Locksmith
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed"
    >
      Residential, commercial & automotive emergencies.
      <strong className="text-foreground"> 20–30 min arrival.</strong>
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-col gap-3"
    >
      <a
        href={defaultBrand.phoneNumber}
        className="touch-target flex items-center justify-center gap-3 skeu-cta-red text-white font-bold text-base px-6 py-4 rounded-xl"
      >
        <Phone className="w-5 h-5" />
        Call {defaultBrand.phoneDisplay}
      </a>
      <a
        href="#quote"
        className="touch-target flex items-center justify-center gap-2 neu-card hover:bg-secondary text-foreground font-semibold px-6 py-3 rounded-xl transition-all"
      >
        Get a Free Quote
      </a>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="mt-8 grid grid-cols-3 gap-3"
    >
      {[
        { label: "Residential", price: "$35" },
        { label: "Commercial", price: "$45" },
        { label: "Automotive", price: "$50" },
      ].map((item, i) => (
        <div key={i} className="neu-card rounded-lg p-3 text-center">
          <p className="text-accent font-display text-xl font-bold">{item.price}+</p>
          <p className="text-[10px] text-muted-foreground font-medium">{item.label}</p>
        </div>
      ))}
    </motion.div>
  </div>
);

export default HeroSection;
