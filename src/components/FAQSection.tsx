import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="font-serif-accent text-accent">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get answers to the most common locksmith questions. Still have questions? Call us 24/7.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl overflow-hidden transition-all ${openId === faq.id ? "neu-card-pressed" : "neu-card"}`}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="touch-target w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openId === faq.id ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
