import { Home, Building2, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { services, Service, ServiceCategory } from "@/data/services";
import ServiceDetailDialog from "@/components/ServiceDetailDialog";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState } from "react";

const categoryConfig: Record<ServiceCategory, { icon: typeof Home; label: string; description: string }> = {
  residential: { icon: Home, label: "Residential", description: "Home lockouts, lock installation, rekeying, smart locks & more" },
  commercial: { icon: Building2, label: "Commercial", description: "Business security, access control, master key systems & more" },
  automotive: { icon: Car, label: "Automotive", description: "Car lockouts, key replacement, ignition repair & more" },
};

const ServiceCarousel = ({ category, onSelect }: { category: ServiceCategory; onSelect: (s: Service) => void }) => {
  const config = categoryConfig[category];
  const catServices = services.filter(s => s.category === category && s.isActive);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
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
            className="p-2.5 rounded-xl neu-card hover:bg-foreground/5 transition-all hover:scale-110 duration-200"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2.5 rounded-xl neu-card hover:bg-foreground/5 transition-all hover:scale-110 duration-200"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {catServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 text-left"
              aria-label={`View details for ${service.title}`}
            >
              <div className="neu-card rounded-2xl p-6 h-full hover:scale-[1.03] transition-all duration-300 group cursor-pointer relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-2xl" />
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                      {service.title}
                    </h4>
                    <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-accent font-display font-bold text-xl">${service.startingPrice}</span>
                    <span className="text-xs text-muted-foreground">starting</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelect = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  return (
    <section id="services" className="py-20 relative" itemScope itemType="https://schema.org/OfferCatalog">
      <meta itemProp="name" content="Xcel Locksmith Services" />
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
            <ServiceCarousel key={cat} category={cat} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      <ServiceDetailDialog
        service={selectedService}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  );
};

export default ServicesSection;
