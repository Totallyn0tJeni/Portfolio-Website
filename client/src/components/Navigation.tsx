import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, User, Users, Palette, Code, Camera, Mail, Menu, X, FileText, Settings2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/blog", label: "Blog", icon: FileText },
  { path: "/clubs", label: "Extracurriculars & Clubs", icon: Users },
  { path: "/marketing", label: "Marketing", icon: Palette },
  { path: "/photography", label: "Photography", icon: Camera },
  { path: "/coding", label: "Coding", icon: Code },
  { path: "/contact", label: "Contact", icon: Mail },
];

const colors = [
  { name: "Purple (Default)", value: "262 83% 58%" },
  { name: "Blue", value: "221 83% 53%" },
  { name: "Rose", value: "346 84% 61%" },
  { name: "Emerald", value: "142 71% 45%" },
  { name: "Amber", value: "38 92% 50%" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
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
            
            <div className="w-px h-6 bg-white/10 mx-2" />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-white/10 text-white/70 hover:text-white">
                  <Settings2 size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 glass-panel border-white/20 p-4 rounded-2xl">
                <div className="space-y-4">
                  <h4 className="font-bold text-white text-sm">Customize Theme</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setTheme({ primary: color.value })}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                          theme.primary === color.value ? "border-white scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: `hsl(${color.value})` }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
