import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Users, Palette, Code, Camera, Mail, Menu, X, FileText } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/blog", label: "Blog", icon: FileText },
  { path: "/clubs", label: "Extracurriculars & Clubs", icon: Users },
  { path: "/marketing", label: "Marketing", icon: Palette },
  { path: "/photography", label: "Photography", icon: Camera },
  { path: "/coding", label: "Coding", icon: Code },
  { path: "/contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center">
          <div className="glass-panel rounded-full px-2 py-2 flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path} className="relative px-5 py-2.5 rounded-full transition-colors">
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={`relative flex items-center gap-2 font-medium ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}>
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex justify-between items-center glass-panel px-4 py-3 rounded-xl">
          <span className="font-display font-bold text-xl text-white">Portfolio</span>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-4 right-4 glass-panel rounded-2xl p-4 flex flex-col gap-2"
          >
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive ? "bg-white/20 text-white font-semibold" : "text-white/80 hover:bg-white/10"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
