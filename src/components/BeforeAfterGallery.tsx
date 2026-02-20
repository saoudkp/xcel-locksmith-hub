import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ComparisonSlider from "./ComparisonSlider";

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
  { id: 1, title: "Deadbolt Replacement", category: "Residential", before: before1, after: after1 },
  { id: 2, title: "Front Door Lock Rekey", category: "Residential", before: before1, after: after1 },
  { id: 3, title: "Smart Lock Installation", category: "Residential", before: before1, after: after1 },
  { id: 4, title: "Car Lock Cylinder Repair", category: "Automotive", before: before2, after: after2 },
  { id: 5, title: "Transponder Key Programming", category: "Automotive", before: before2, after: after2 },
  { id: 6, title: "Ignition Lock Replacement", category: "Automotive", before: before2, after: after2 },
  { id: 7, title: "Access Control Upgrade", category: "Commercial", before: before3, after: after3 },
  { id: 8, title: "Office Master Key System", category: "Commercial", before: before3, after: after3 },
  { id: 9, title: "Panic Bar Installation", category: "Commercial", before: before3, after: after3 },
];

const categories = ["All", ...Array.from(new Set(galleryItems.map((i) => i.category)))];

const BeforeAfterGallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  const openFullscreen = (item: GalleryItem) => setSelectedItem(item);
  const closeFullscreen = () => setSelectedItem(null);

  const navigateFullscreen = (dir: number) => {
    if (!selectedItem) return;
    const list = filteredItems;
    const idx = list.findIndex((i) => i.id === selectedItem.id);
    const next = (idx + dir + list.length) % list.length;
    setSelectedItem(list[next]);
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
            Drag the slider on any image to compare before and after results.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent text-primary-foreground"
                    : "glass-card text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-[4/3]">
                <ComparisonSlider
                  before={item.before}
                  after={item.after}
                  className="w-full h-full cursor-ew-resize"
                />
                <button
                  onClick={() => openFullscreen(item)}
                  className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
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
                <p className="text-muted-foreground text-sm mt-1">Drag slider to compare</p>
              </div>
            </motion.div>
          ))}
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
              <button
                onClick={closeFullscreen}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-20"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={() => navigateFullscreen(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateFullscreen(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="rounded-xl overflow-hidden aspect-[16/9]">
                <ComparisonSlider
                  before={selectedItem.before}
                  after={selectedItem.after}
                  className="w-full h-full cursor-ew-resize"
                />
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
