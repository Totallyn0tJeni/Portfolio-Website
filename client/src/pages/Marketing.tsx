import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Palette, Clock } from "lucide-react";

export default function Marketing() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 max-w-xl"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
              <div className="relative glass-panel p-8 rounded-full">
                <Palette size={56} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white">
              Marketing <span className="text-gradient">Portfolio</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <Clock size={16} className="animate-pulse" />
              <span>Coming Soon</span>
            </div>
            <p className="text-white/60 text-lg leading-relaxed">
              I'm putting together my full marketing portfolio — campaigns, brand designs, social media work, and more. Check back soon!
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-primary/20 space-y-2">
            <p className="text-white/50 text-sm">In the meantime, feel free to explore the rest of my work or get in touch.</p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
