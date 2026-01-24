import { PageTransition } from "@/components/PageTransition";
import { Github, Twitter, Linkedin, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageTransition className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Profile Photo Placeholder */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative group mb-8"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-40 h-40 rounded-full bg-slate-800 overflow-hidden border-2 border-white/20 flex items-center justify-center">
          {/* Replace with actual image */}
          <span className="text-4xl text-white/50">JD</span> 
        </div>
      </motion.div>

      {/* Intro Text */}
      <div className="glass-panel p-8 rounded-2xl max-w-2xl w-full mb-8 backdrop-blur-xl bg-white/5 border-white/10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
          Hi, I'm <span className="text-gradient">John Doe</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
          A passionate developer and creative thinker building digital experiences that matter.
          I specialize in full-stack development, community leadership, and marketing design.
          Welcome to my digital garden.
        </p>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-4">
        <SocialButton href="https://github.com" icon={Github} label="GitHub" />
        <SocialButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
        <SocialButton href="https://twitter.com" icon={Twitter} label="Twitter" />
        <SocialButton href="mailto:hello@example.com" icon={Mail} label="Email" />
        <SocialButton href="/resume.pdf" icon={FileText} label="Resume" />
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
