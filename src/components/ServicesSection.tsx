import { Home, Building2, Car, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { services, ServiceCategory } from "@/data/services";

const categoryConfig: Record<ServiceCategory, { icon: typeof Home; label: string; description: string }> = {
  residential: { icon: Home, label: "Residential", description: "Home lockouts, lock installation, rekeying, smart locks & more" },
  commercial: { icon: Building2, label: "Commercial", description: "Business security, access control, master key systems & more" },
  automotive: { icon: Car, label: "Automotive", description: "Car lockouts, key replacement, ignition repair & more" },
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
            Complete Locksmith <span className="text-accent">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            29 professional locksmith services across residential, commercial & automotive —
            all backed by transparent pricing and our no-hidden-fees guarantee.
          </p>
        </motion.div>

        <div className="space-y-12">
          {(["residential", "commercial", "automotive"] as ServiceCategory[]).map((cat) => {
            const config = categoryConfig[cat];
            const catServices = services.filter(s => s.category === cat && s.isActive);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <config.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{config.label}</h3>
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catServices.map((service) => (
                    <div
                      key={service.id}
                      className="glass-card rounded-xl p-5 hover:bg-secondary/50 transition-all group cursor-default"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-accent font-display font-bold text-lg">${service.startingPrice}</span>
                          <span className="text-xs text-muted-foreground block">starting</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
