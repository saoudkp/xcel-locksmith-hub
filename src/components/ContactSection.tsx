import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Facebook, Instagram, Globe, Video, MapPin } from "lucide-react";
import { defaultContact } from "@/data/siteConfig";

const contacts = [
  {
    icon: Phone,
    label: "Call 24/7",
    value: defaultContact.phoneDisplay,
    href: defaultContact.phone,
    accent: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: defaultContact.email || "info@xcellocksmith.com",
    href: `mailto:${defaultContact.email || "info@xcellocksmith.com"}`,
    accent: false,
  },
  {
    icon: MessageCircle,
    label: "Text Us",
    value: defaultContact.phoneDisplay,
    href: `sms:+12165551234`,
    accent: false,
  },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/xcellocksmith" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/xcellocksmith" },
  { icon: Video, label: "TikTok", href: "https://tiktok.com/@xcellocksmith" },
  { icon: Globe, label: "YouTube", href: "https://youtube.com/@xcellocksmith" },
  { icon: MapPin, label: "Google Business", href: "https://g.page/xcellocksmith" },
  { icon: Globe, label: "Yelp", href: "https://yelp.com/biz/xcel-locksmith-cleveland" },
  { icon: Globe, label: "Nextdoor", href: "https://nextdoor.com/pages/xcel-locksmith-cleveland-oh" },
  { icon: Globe, label: "LinkedIn", href: "https://linkedin.com/company/xcellocksmith" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="font-serif-accent text-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Reach us anytime — we're always just a call, text, or message away.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 max-w-3xl mx-auto">
          {contacts.map(({ icon: Icon, label, value, href, accent }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="neu-card rounded-2xl px-6 py-4 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent ? "skeu-cta-red group-hover:animate-pulse-glow-red" : "skeu-badge"}`}>
                <Icon className={`w-5 h-5 ${accent ? "text-white" : "text-accent"}`} />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className={`font-display font-bold ${accent ? "text-accent" : "text-foreground"}`}>{value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-sm text-muted-foreground font-medium">Follow us on social media:</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Xcel Locksmith on ${label}`}
                className="p-3 neu-card rounded-xl text-muted-foreground hover:text-accent transition-colors hover:scale-110 duration-200 flex items-center gap-2"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
