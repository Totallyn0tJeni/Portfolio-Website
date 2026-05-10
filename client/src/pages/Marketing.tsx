import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageOff, Palette } from "lucide-react";
import { useState } from "react";
import { useMarketingWork } from "@/hooks/use-portfolio";
import type { MarketingWork } from "@shared/schema";

const CATEGORIES = ["All", "Social Media", "Brand Design", "Event Marketing", "Print Design"];

function ItemModal({ item, onClose }: { item: MarketingWork; onClose: () => void }) {
  const images = [
    ...(item.imageUrl ? [item.imageUrl] : []),
    ...(item.carouselImages ?? []).filter(img => img !== item.imageUrl),
  ];
  const [idx, setIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            {item.category && <span className="text-xs text-primary font-medium">{item.category}</span>}
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"><X size={20} /></button>
        </div>

        {images.length > 0 ? (
          <div className="relative flex-1 min-h-0 bg-black/40 flex items-center justify-center">
            <img src={images[idx]} alt={item.title} className="max-h-[55vh] max-w-full object-contain" />
            {images.length > 1 && (
              <>
                <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} className="absolute left-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"><ChevronLeft size={20} /></button>
                <button onClick={() => setIdx(i => Math.min(images.length - 1, i + 1))} disabled={idx === images.length - 1} className="absolute right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"><ChevronRight size={20} /></button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-white scale-125" : "bg-white/40"}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 min-h-[200px] flex items-center justify-center text-white/30 flex-col gap-3">
            <ImageOff size={40} />
            <span className="text-sm">No image available</span>
          </div>
        )}

        <div className="p-5 border-t border-white/10">
          <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Marketing() {
  const { data: items = [], isLoading } = useMarketingWork();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MarketingWork | null>(null);

  const filtered = activeCategory === "All"
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-gradient mb-2">Marketing Portfolio</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Campaigns, designs, and visual assets from my marketing work across events, clubs, and organizations.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] glass-card rounded-3xl p-12 text-center border border-white/10">
            <Palette size={48} className="text-primary mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No items in this category</h2>
            <p className="text-white/50 text-sm">Try a different filter or add items from the admin panel.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.03 }}
                  className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300 bg-white/5"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <ImageOff size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold text-sm leading-tight">{item.title}</p>
                      {item.category && <p className="text-primary text-xs mt-0.5">{item.category}</p>}
                    </div>
                    {item.carouselImages && item.carouselImages.length > 0 && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                        +{item.carouselImages.length}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
}
