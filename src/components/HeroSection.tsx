import { useEffect, useRef, useState } from "react";
import { Phone, Shield, Clock, Star, Award, DollarSign } from "lucide-react";
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
        {/* The animation container */}
        <HeroLockAnimation />

        {/* Overlay + content pinned on top of the sticky canvas */}
        <div className="absolute inset-0 pointer-events-none" style={{ height: SCROLL_HEIGHT }}>
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end pointer-events-auto">
            {/* Subtle gradient for text readability — only bottom area */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/40 to-transparent" />

            {/* Hero content — fades in via scroll */}
            <div className="container mx-auto px-4 relative z-10 pb-10">
              <HeroContentDesktop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Desktop: cinematic bottom-aligned layout with scroll-driven fade */
const HeroContentDesktop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress within the hero section (0 to 1)
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      // Content fades in during first 30% of scroll, stays visible
      const fadeIn = Math.min(1, scrollY / (windowH * 0.5));
      setScrollProgress(fadeIn);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contentOpacity = scrollProgress;
  const contentTranslateY = (1 - scrollProgress) * 40; // slides up 40px

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto"
      style={{
        opacity: contentOpacity,
        transform: `translateY(${contentTranslateY}px)`,
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
      }}
    >
      {/* Bottom row: headline left, CTA + prices right */}
      <div className="flex items-end justify-between gap-8">
        {/* Left: headline + subtitle */}
        <div className="max-w-2xl">
          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-4">
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

          <h1 className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl lg:text-5xl xl:text-6xl text-foreground drop-shadow-lg">
            Cleveland's Fastest<br />
            <span className="text-accent">24/7 Emergency</span> Locksmith
          </h1>

          <p className="text-sm lg:text-base text-foreground/70 max-w-lg mt-3 leading-relaxed drop-shadow-sm">
            Locked out? We handle residential, commercial & automotive emergencies.
            <strong className="text-foreground"> 20–30 min arrival.</strong>
          </p>
        </div>

        {/* Right: CTA stack */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* Response badge */}
          <div className="flex items-center gap-3 bg-background/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/30">
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
          >
            <Phone className="w-5 h-5" />
            Call {defaultBrand.phoneDisplay}
          </a>
          <a
            href="#quote"
            className="touch-target flex items-center justify-center gap-2 bg-background/50 backdrop-blur-md hover:bg-background/70 text-foreground font-semibold px-7 py-3 rounded-xl transition-all border border-border/30 w-full text-center text-sm"
          >
            Get a Free Quote
          </a>

          {/* Prices row */}
          <div className="flex gap-2">
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
