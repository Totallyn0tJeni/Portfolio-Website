import { PageTransition } from "@/components/PageTransition";
import { Github, Twitter, Linkedin, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageTransition className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 px-6">
      {/* Cutout Image Section */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative group lg:w-1/2 flex justify-center lg:justify-end"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] animate-float">
          {/* Glass background for the "cutout" effect container */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl -z-10"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 shadow-2xl">
            {/* Placeholder for cutout image - in real use, this would be an <img> with object-cover */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-transparent to-black/40">
              <span className="text-6xl font-bold text-white/20">IMAGE</span>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
      </motion.div>

      {/* Intro Text */}
      <div className="lg:w-1/2 text-left space-y-6">
        <div className="glass-panel p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-50"></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-4 tracking-tight">
            Hi, I'm <br/><span className="text-gradient">John Doe</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            A passionate developer and creative thinker building digital experiences that matter.
            I specialize in full-stack development, community leadership, and marketing design.
            Welcome to my digital garden.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}

function SocialButton({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className="glass-button flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
    >
      <Icon size={20} />
      <span>{label}</span>
    </a>
  );
}
