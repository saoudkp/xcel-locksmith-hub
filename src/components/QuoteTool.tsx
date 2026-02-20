import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Car, Camera, Send, CheckCircle, ChevronRight, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Step = 1 | 2 | 3 | 4;
type ServiceType = "residential" | "commercial" | "automotive";

const QuoteTool = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = () => {
    if (honeypot) return; // bot detected
    if (!name.trim()) { toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" }); return; }
    if (!phone.trim()) { toast({ title: "Phone required", description: "Please enter your phone number.", variant: "destructive" }); return; }
    setSubmitted(true);
    toast({ title: "Quote Request Sent!", description: "We'll call you within minutes." });
  };

  if (submitted) {
    return (
      <section id="quote" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto glass-card rounded-2xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Quote Request Received!</h3>
            <p className="text-muted-foreground mb-6">Our team will call you within minutes to discuss your needs and provide an exact quote.</p>
            <a href="tel:+12165551234" className="touch-target inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl">
              <Phone className="w-5 h-5" /> Can't Wait? Call Now
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get a <span className="text-accent">Free Quote</span> in Seconds
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tell us what you need and we'll give you an upfront price — no surprises, no hidden fees.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto glass-card rounded-2xl p-8">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? "bg-accent" : "bg-border"}`} />
            ))}
          </div>

          {/* Honeypot */}
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-4">What type of service?</h3>
                <div className="space-y-3">
                  {([
                    { type: "residential" as ServiceType, icon: Home, label: "Residential", desc: "Home lockouts, lock changes, rekeying" },
                    { type: "commercial" as ServiceType, icon: Building2, label: "Commercial", desc: "Business locks, access control, master keys" },
                    { type: "automotive" as ServiceType, icon: Car, label: "Automotive", desc: "Car lockouts, key replacement, ignition repair" },
                  ]).map(opt => (
                    <button
                      key={opt.type}
                      onClick={() => { setServiceType(opt.type); setStep(2); }}
                      className={`touch-target w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        serviceType === opt.type ? "border-accent bg-accent/10" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <opt.icon className="w-8 h-8 text-accent shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{opt.label}</p>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-4">Where are you located?</h3>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="City or address in Cleveland area"
                  className="touch-target w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                />
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="touch-target px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="touch-target flex-1 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-red-glow transition-colors">Next</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-4">Upload a photo (optional)</h3>
                <label className="touch-target flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary transition-colors">
                  <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">{photo ? photo.name : "Tap to upload a photo of your lock or key"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => setPhoto(e.target.files?.[0] || null)} />
                </label>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="touch-target px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">Back</button>
                  <button onClick={() => setStep(4)} className="touch-target flex-1 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-red-glow transition-colors">Next</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-display text-xl font-bold mb-4">Your contact info</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name *"
                    className="touch-target w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Phone number *"
                    className="touch-target w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(3)} className="touch-target px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">Back</button>
                  <button onClick={handleSubmit} className="touch-target flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-xl hover:bg-red-glow transition-colors">
                    <Send className="w-5 h-5" /> Submit Quote Request
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuoteTool;
