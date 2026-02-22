import { useState, useCallback } from "react";
import { Phone, Shield, Clock, Star, Award, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { defaultBrand } from "@/data/siteConfig";
import HeroLockAnimation from "./HeroLockAnimation";

const HeroSection = () => {
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((p: number) => {
    setProgress(p);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Mobile: standard hero (no scroll animation) */}
      <div className="md:hidden relative min-h-screen flex items-end pb-12 pt-28">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <HeroContentMobile />
        </div>
      </div>

      {/* Desktop: GSAP-pinned lock animation — everything inside the pinned element */}
      <div className="hidden md:block">
        <HeroLockAnimation onProgress={handleProgress}>
          {/* Gradient overlays — cinematic bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-[1]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-[1]" />

          {/* Hero content — staggered reveal */}
          <div className="absolute inset-0 flex flex-col justify-end z-[2]">
            <div className="container mx-auto px-4 pb-10">
              <HeroContentDesktop progress={progress} />
            </div>
          </div>

          {/* Scroll indicator — fades out as you scroll */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[3]"
            style={{
              opacity: Math.max(0, 1 - progress * 5),
              pointerEvents: "none",
            }}
          >
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </div>
        </HeroLockAnimation>
      </div>
    </section>
  );
};

/** Desktop: staggered reveal driven by scroll progress */
const HeroContentDesktop = ({ progress }: { progress: number }) => {
  const stagger = (index: number, total: number) => {
    const start = 0.15 + (index / total) * 0.35;
    const localP = Math.max(0, Math.min(1, (progress - start) / 0.2));
    const eased = localP * localP * (3 - 2 * localP); // smoothstep
    return {
      opacity: eased,
      transform: `translateY(${(1 - eased) * 30}px)`,
      transition: "none",
    };
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-4" style={stagger(0, 6)}>
            {[
              { icon: Clock, text: "24/7" },
              { icon: Shield, text: "Licensed" },
              { icon: Star, text: "5-Star" },
              { icon: Award, text: "Ohio" },
            ].map((badge, i) => (
              <div key={i} className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/15">
                <badge.icon className="w-3 h-3 text-accent" />
                {badge.text}
              </div>
            ))}
          </div>

          <h1 className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl lg:text-5xl xl:text-6xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={stagger(1, 6)}>
            Cleveland's Fastest<br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">24/7 Emergency</span> Locksmith
          </h1>

          <p className="text-sm lg:text-base text-white/60 max-w-lg mt-3 leading-relaxed" style={stagger(2, 6)}>
            Locked out? We handle residential, commercial & automotive emergencies.
            <strong className="text-white/90"> 20–30 min arrival.</strong>
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-white/8 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10" style={stagger(3, 6)}>
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-accent font-display text-lg font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">{defaultBrand.responseTime}</p>
              <p className="text-[10px] text-white/40">Guaranteed response</p>
            </div>
          </div>

          <a href={defaultBrand.phoneNumber} className="touch-target flex items-center justify-center gap-3 skeu-cta-red text-white font-bold text-base px-7 py-3.5 rounded-xl w-full" style={stagger(4, 6)}>
            <Phone className="w-5 h-5" />
            Call {defaultBrand.phoneDisplay}
          </a>
          <a href="#quote" className="touch-target flex items-center justify-center gap-2 bg-white/8 backdrop-blur-md hover:bg-white/15 text-white font-semibold px-7 py-3 rounded-xl transition-all border border-white/10 w-full text-center text-sm" style={stagger(4, 6)}>
            Get a Free Quote
          </a>

          <div className="flex gap-2" style={stagger(5, 6)}>
            {[
              { label: "Residential", price: "$35" },
              { label: "Commercial", price: "$45" },
              { label: "Automotive", price: "$50" },
            ].map((item, i) => (
              <div key={i} className="bg-white/6 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center border border-white/8">
                <p className="text-accent font-display text-base font-bold">{item.price}+</p>
                <p className="text-[9px] text-white/35 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Mobile */
const HeroContentMobile = () => (
  <div className="max-w-lg mx-auto text-center">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-2 mb-6">
      {[
        { icon: Clock, text: "24/7" },
        { icon: Shield, text: "Licensed" },
        { icon: Star, text: "5-Star" },
      ].map((badge, i) => (
        <div key={i} className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/15">
          <badge.icon className="w-3 h-3 text-accent" />
          {badge.text}
        </div>
      ))}
    </motion.div>

    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-display font-extrabold tracking-tight mb-4 leading-[1.1] text-3xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
      Cleveland's Fastest<br /><span className="text-accent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">24/7</span> Locksmith
    </motion.h1>

    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-sm text-white/50 max-w-sm mx-auto mb-6 leading-relaxed">
      Residential, commercial & automotive emergencies.
      <strong className="text-white/90"> 20–30 min arrival.</strong>
    </motion.p>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col gap-3">
      <a href={defaultBrand.phoneNumber} className="touch-target flex items-center justify-center gap-3 skeu-cta-red text-white font-bold text-base px-6 py-4 rounded-xl">
        <Phone className="w-5 h-5" />Call {defaultBrand.phoneDisplay}
      </a>
      <a href="#quote" className="touch-target flex items-center justify-center gap-2 bg-white/8 backdrop-blur-md hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/10">
        Get a Free Quote
      </a>
    </motion.div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="mt-8 grid grid-cols-3 gap-3">
      {[
        { label: "Residential", price: "$35" },
        { label: "Commercial", price: "$45" },
        { label: "Automotive", price: "$50" },
      ].map((item, i) => (
        <div key={i} className="bg-white/8 backdrop-blur-sm rounded-lg p-3 text-center border border-white/10">
          <p className="text-accent font-display text-xl font-bold">{item.price}+</p>
          <p className="text-[10px] text-white/35 font-medium">{item.label}</p>
        </div>
      ))}
    </motion.div>
  </div>
);

export default HeroSection;
