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
  { name: "Purple", primary: "262 83% 58%", accent: "310 70% 65%" },
  { name: "Blue", primary: "221 83% 53%", accent: "199 89% 48%" },
  { name: "Rose", primary: "346 84% 61%", accent: "354 70% 54%" },
  { name: "Emerald", primary: "142 71% 45%", accent: "160 84% 39%" },
  { name: "Amber", primary: "38 92% 50%", accent: "48 96% 53%" },
];

function ThemePicker() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Color Theme</p>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => {
          const isActive = theme.primary === color.primary;
          return (
            <button
              key={color.primary}
              onClick={() => setTheme({ primary: color.primary, accent: color.accent })}
              title={color.name}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  isActive ? "border-white scale-110 shadow-lg" : "border-transparent hover:border-white/40"
                }`}
                style={{ backgroundColor: `hsl(${color.primary})` }}
              />
              <span className={`text-[10px] transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center items-center gap-4">
          <div className="glass-panel rounded-full px-2 py-2 flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path} className="relative px-4 py-2 rounded-full transition-colors">
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={`relative flex items-center gap-1.5 font-medium text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}>
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}

            <div className="w-px h-6 bg-white/10 mx-1" />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-9 h-9 hover:bg-white/10 text-white/70 hover:text-white shrink-0"
                  data-testid="button-theme-picker"
                >
                  <Settings2 size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
              >
                <ThemePicker />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex justify-between items-center glass-panel px-4 py-3 rounded-xl w-full">
          <Link href="/">
            <span className="font-display font-bold text-xl text-white cursor-pointer hover:text-primary transition-colors">Jenisha</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            data-testid="button-mobile-menu"
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

            <div className="border-t border-white/10 mt-1 pt-3 px-2">
              <ThemePicker />
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
