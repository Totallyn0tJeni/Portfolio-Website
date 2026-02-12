import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function Photography() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Photography</h1>
          <p className="text-white/60">Capturing moments and perspectives through the lens.</p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px] glass-card rounded-3xl p-12 text-center border border-white/10">
          <div className="bg-purple-500/20 p-6 rounded-full mb-6">
            <Camera className="text-purple-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Gallery Coming Soon</h2>
          <p className="text-white/60 max-w-md mx-auto leading-relaxed">
            I'm currently curating my best shots to showcase here. Check back soon to see my visual storytelling journey through photography.
          </p>
          <motion.div 
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
