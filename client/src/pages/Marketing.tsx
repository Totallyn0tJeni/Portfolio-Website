import { PageTransition } from "@/components/PageTransition";
import { useMarketingWork } from "@/hooks/use-portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  if (!images || !images.length) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black/50 group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-h-full max-w-full object-contain"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Marketing() {
  const { data: works, isLoading } = useMarketingWork();

  if (isLoading) {
    return (
      <PageTransition>
        <div className="text-center text-white/60 animate-pulse">Loading gallery...</div>
      </PageTransition>
    );
  }

  const displayWorks = works || [];

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Marketing Portfolio</h1>
          <p className="text-white/60">A collection of designs, posters, and social media campaigns.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWorks.map((work, idx) => (
            <Dialog key={work.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative cursor-pointer"
                >
                  <div className="glass-card overflow-hidden rounded-2xl aspect-[4/3] relative">
                    <img 
                      src={work.imageUrl} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {work.carouselImages && work.carouselImages.length > 0 && (
                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-lg text-white/80">
                        <Layers size={16} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {work.title}
                      </h3>
                      <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {work.carouselImages && work.carouselImages.length > 0 ? "View Carousel" : "View Details"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 overflow-hidden">
                <div className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]">
                  <div className="w-full md:w-2/3 flex items-center justify-center min-h-[300px]">
                    {work.carouselImages && work.carouselImages.length > 0 ? (
                      <Carousel images={work.carouselImages} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-black/50 p-4">
                        <img 
                          src={work.imageUrl} 
                          alt={work.title}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white/5 backdrop-blur-xl border-l border-white/10 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">{work.title}</h2>
                    <p className="text-white/80 leading-relaxed mb-6">
                      {work.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">
                        Marketing & Design
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
