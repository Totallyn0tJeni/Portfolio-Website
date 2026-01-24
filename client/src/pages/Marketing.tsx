import { PageTransition } from "@/components/PageTransition";
import { useMarketingWork } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function Marketing() {
  const { data: works, isLoading } = useMarketingWork();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <PageTransition>
        <div className="text-center text-white/60 animate-pulse">Loading gallery...</div>
      </PageTransition>
    );
  }

  // Use dummy data if empty for visualization
  const displayWorks = works?.length ? works : Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: `Campaign Design ${i + 1}`,
    description: "Social media marketing assets created for student organization outreach.",
    imageUrl: `https://images.unsplash.com/photo-${[
      "1542435503-956c469947f6", 
      "1561070791-2526d30994b5", 
      "1550745165-9bc0b252726f",
      "1626785774573-4b799315345d",
      "1611162617474-5b21e879e113",
      "1626785774625-ddcddc3445e9"
    ][i]}?w=800&q=80&fit=crop`
  }));

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
                    {/* Descriptive HTML comment for unsplash placeholder */}
                    {/* creative design abstract geometric colorful */}
                    <img 
                      src={work.imageUrl} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {work.title}
                      </h3>
                      <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        View Details
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 overflow-hidden">
                <div className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]">
                  <div className="w-full md:w-2/3 bg-black/50 flex items-center justify-center p-4">
                    <img 
                      src={work.imageUrl} 
                      alt={work.title}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                  <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white/5 backdrop-blur-xl border-l border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">{work.title}</h2>
                    <p className="text-white/80 leading-relaxed mb-6">
                      {work.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">
                        Graphic Design / Social Media
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
