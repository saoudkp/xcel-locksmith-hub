import { Home, Building2, Car, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { services, Service, ServiceCategory } from "@/data/services";
import ServiceDetailDialog from "@/components/ServiceDetailDialog";
import categoryResidentialImg from "@/assets/category-residential.jpg";
import categoryCommercialImg from "@/assets/category-commercial.jpg";
import categoryAutomotiveImg from "@/assets/category-automotive.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";

const categoryConfig: Record<ServiceCategory, {
  icon: typeof Home;
  label: string;
  description: string;
  image: string;
  gradient: string;
  accentBorder: string;
}> = {
  residential: {
    icon: Home,
    label: "Residential",
    description: "Home lockouts, lock installation, rekeying, smart locks & more",
    image: categoryResidentialImg,
    gradient: "from-blue/20 via-transparent to-transparent",
    accentBorder: "border-l-blue",
  },
  commercial: {
    icon: Building2,
    label: "Commercial",
    description: "Business security, access control, master key systems & more",
    image: categoryCommercialImg,
    gradient: "from-accent/20 via-transparent to-transparent",
    accentBorder: "border-l-accent",
  },
  automotive: {
    icon: Car,
    label: "Automotive",
    description: "Car lockouts, key replacement, ignition repair & more",
    image: categoryAutomotiveImg,
    gradient: "from-cta-red/20 via-transparent to-transparent",
    accentBorder: "border-l-cta-red",
  },
};

const ServiceCarousel = ({ category, onSelect }: { category: ServiceCategory; onSelect: (s: Service) => void }) => {
  const config = categoryConfig[category];
  const catServices = services.filter(s => s.category === category && s.isActive);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="neu-card rounded-3xl overflow-hidden"
    >
      {/* Category header with image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={config.image}
          alt={`${config.label} locksmith services in Cleveland`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl skeu-badge flex items-center justify-center">
                <config.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{config.label}</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="p-5 sm:p-8">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {catServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => onSelect(service)}
                  className={`flex-[0_0_80%] sm:flex-[0_0_44%] lg:flex-[0_0_30%] min-w-0 text-left`}
                  aria-label={`View details for ${service.title}`}
                >
                  <div className={`rounded-2xl p-5 h-full border-l-4 ${config.accentBorder} bg-background/50 hover:bg-background transition-all duration-300 group cursor-pointer relative overflow-hidden hover:shadow-lg`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${config.gradient} rounded-2xl`} />
                    <div className="relative flex flex-col gap-3 h-full">
                      <h4 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors leading-tight">
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-accent font-display font-bold text-xl">${service.startingPrice}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">starting</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                          Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dots + Arrows */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-1.5">
            {catServices.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedIndex ? "w-6 bg-accent" : "w-1.5 bg-muted-foreground/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full neu-card hover:bg-accent/10 transition-all"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full neu-card hover:bg-accent/10 transition-all"
              aria-label="Next service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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

        <div className="space-y-10">
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
