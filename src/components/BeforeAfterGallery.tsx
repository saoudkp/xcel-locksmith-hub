import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import before1 from "@/assets/gallery/before-1.jpg";
import after1 from "@/assets/gallery/after-1.jpg";
import before2 from "@/assets/gallery/before-2.jpg";
import after2 from "@/assets/gallery/after-2.jpg";
import before3 from "@/assets/gallery/before-3.jpg";
import after3 from "@/assets/gallery/after-3.jpg";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  before: string;
  after: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Residential Deadbolt Replacement", category: "Residential", before: before1, after: after1 },
  { id: 2, title: "Car Lock Cylinder Repair", category: "Automotive", before: before2, after: after2 },
  { id: 3, title: "Commercial Access Control Upgrade", category: "Commercial", before: before3, after: after3 },
];

const BeforeAfterGallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showAfter, setShowAfter] = useState<Record<number, boolean>>({});

  const toggleBeforeAfter = (id: number) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openFullscreen = (item: GalleryItem) => setSelectedItem(item);
  const closeFullscreen = () => setSelectedItem(null);

  const navigateFullscreen = (dir: number) => {
    if (!selectedItem) return;
    const idx = galleryItems.findIndex((i) => i.id === selectedItem.id);
    const next = (idx + dir + galleryItems.length) % galleryItems.length;
    setSelectedItem(galleryItems[next]);
  };

  return (
    <section id="gallery" className="py-20 px-4" aria-label="Before & After Gallery">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Before & After Gallery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See the quality of our locksmith work — tap any card to toggle before/after.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => {
            const isAfter = !!showAfter[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => toggleBeforeAfter(item.id)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={isAfter ? "after" : "before"}
                      src={isAfter ? item.after : item.before}
                      alt={`${isAfter ? "After" : "Before"} — ${item.title}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground ${
                      isAfter ? "bg-green-500" : "bg-accent"
                    }`}
                  >
                    {isAfter ? "After" : "Before"}
                  </span>

                  {/* Fullscreen button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFullscreen(item);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-foreground font-display text-lg mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">Tap to toggle before/after</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeFullscreen}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav arrows */}
              <button
                onClick={() => navigateFullscreen(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateFullscreen(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Side-by-side */}
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={selectedItem.before}
                    alt={`Before — ${selectedItem.title}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-primary-foreground">
                    Before
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={selectedItem.after}
                    alt={`After — ${selectedItem.title}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500 text-primary-foreground">
                    After
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-white font-display text-xl">{selectedItem.title}</h3>
                <p className="text-white/60 text-sm">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BeforeAfterGallery;
