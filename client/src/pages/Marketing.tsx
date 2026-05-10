import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Palette, Clock, Sparkles } from "lucide-react";

export default function Marketing() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 relative">
            <Palette size={56} className="text-primary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Clock size={14} />
            Coming Soon
          </div>

          <h1 className="text-5xl lg:text-7xl font-display font-bold text-white">
            Marketing<br />
            <span className="text-gradient">Portfolio</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed">
            I'm currently curating my best marketing work — campaigns, social media designs, 
            branding projects, and more. Check back soon!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mt-8"
        >
          {["Social Media Campaigns", "Brand Design", "Event Marketing"].map((item, i) => (
            <div
              key={item}
              className="glass-panel p-4 rounded-2xl text-center border border-white/5"
            >
              <Sparkles size={20} className="text-primary mx-auto mb-2" />
              <p className="text-white/70 text-sm font-medium">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
