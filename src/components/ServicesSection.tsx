import { Home, Building2, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { services, ServiceCategory } from "@/data/services";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

const categoryConfig: Record<ServiceCategory, { icon: typeof Home; label: string; description: string }> = {
  residential: { icon: Home, label: "Residential", description: "Home lockouts, lock installation, rekeying, smart locks & more" },
  commercial: { icon: Building2, label: "Commercial", description: "Business security, access control, master key systems & more" },
  automotive: { icon: Car, label: "Automotive", description: "Car lockouts, key replacement, ignition repair & more" },
};

const ServiceCarousel = ({ category }: { category: ServiceCategory }) => {
  const config = categoryConfig[category];
  const catServices = services.filter(s => s.category === category && s.isActive);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl skeu-badge flex items-center justify-center">
            <config.icon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">{config.label}</h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-lg neu-card hover:bg-foreground/5 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-lg neu-card hover:bg-foreground/5 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {catServices.map((service) => (
            <div
              key={service.id}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
            >
              <div className="neu-card rounded-xl p-5 h-full hover:bg-foreground/5 transition-all group cursor-default">
                <div className="flex flex-col gap-3">
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-accent font-display font-bold text-xl">${service.startingPrice}</span>
                    <span className="text-xs text-muted-foreground">starting</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Complete Locksmith <span className="font-serif-accent text-accent">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            29 professional locksmith services across residential, commercial & automotive —
            all backed by transparent pricing and our no-hidden-fees guarantee.
          </p>
        </motion.div>

        <div className="space-y-14">
          {(["residential", "commercial", "automotive"] as ServiceCategory[]).map((cat) => (
            <ServiceCarousel key={cat} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
