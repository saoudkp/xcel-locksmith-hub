import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { defaultContact, defaultBrand } from "@/data/siteConfig";

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/xcellocksmith", color: "hover:text-blue" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/xcellocksmith", color: "hover:text-accent" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="font-serif-accent text-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Available 24/7 for emergencies or schedule a consultation. Reach us by phone, email, or social media — we respond fast.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          {/* Phone */}
          <motion.a
            href={defaultContact.phone}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="neu-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl skeu-cta-red flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow-red">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Call Us 24/7</h3>
            <p className="text-accent font-semibold">{defaultContact.phoneDisplay}</p>
            <p className="text-xs text-muted-foreground mt-1">No voicemail — real humans answer</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:info@xcellocksmith.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="neu-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl skeu-button flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Email Us</h3>
            <p className="text-accent font-semibold text-sm">info@xcellocksmith.com</p>
            <p className="text-xs text-muted-foreground mt-1">Response within 1 hour</p>
          </motion.a>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="neu-card rounded-2xl p-6 text-center"
          >
            <div className="w-14 h-14 rounded-xl skeu-badge flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Service Area</h3>
            <p className="text-sm text-muted-foreground">{defaultContact.address}</p>
            <p className="text-xs text-muted-foreground mt-1">24+ cities covered</p>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="neu-card rounded-2xl p-6 text-center"
          >
            <div className="w-14 h-14 rounded-xl skeu-badge flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Hours</h3>
            <p className="text-accent font-semibold">{defaultContact.hours}</p>
            <p className="text-xs text-muted-foreground mt-1">Including holidays</p>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="text-sm text-muted-foreground">Follow us:</span>
          {socials.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow Xcel Locksmith on ${label}`}
              className={`p-3 neu-card rounded-xl text-muted-foreground ${color} transition-colors hover:scale-110 duration-200`}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
