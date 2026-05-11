import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Users, Palette, Code, Camera, Mail, FileText, Settings2, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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
      <div className="flex gap-3 flex-wrap">
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
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
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

// Mobile dropdown selector
function MobileNav() {
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = navItems.find(i => i.path === location) ?? navItems[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="md:hidden w-full px-4 py-3" ref={ref}>
      <div className="flex items-center gap-2">
        {/* Page selector */}
        <div className="relative flex-1">
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full glass-panel flex items-center justify-between px-4 py-3 rounded-xl text-white font-medium"
          >
            <div className="flex items-center gap-2.5">
              <current.icon size={18} className="text-primary" />
              <span>{current.label}</span>
            </div>
            <ChevronDown size={16} className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 left-0 right-0 glass-panel rounded-xl overflow-hidden z-50 border border-white/10"
              >
                {navItems.map(item => {
                  const isActive = location === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm font-medium ${
                        isActive
                          ? "bg-primary/20 text-white border-l-2 border-primary"
                          : "text-white/70 hover:bg-white/10 hover:text-white border-l-2 border-transparent"
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="glass-panel rounded-xl w-12 h-12 hover:bg-white/10 text-white/70 hover:text-white shrink-0">
              <Settings2 size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <ThemePicker />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4">
      {/* Desktop Nav */}
      <div className="hidden md:flex justify-center">
        <div className="glass-panel rounded-2xl px-3 py-2 flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path} className="relative px-4 py-2.5 rounded-xl transition-colors group">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <div className={`relative flex items-center gap-2 font-medium text-[15px] transition-colors ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                  <item.icon size={17} className={isActive ? "text-primary" : ""} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}

          <div className="w-px h-7 bg-white/10 mx-2" />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl w-10 h-10 hover:bg-white/10 text-white/60 hover:text-white shrink-0"
              >
                <Settings2 size={18} />
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

      {/* Mobile Nav */}
      <MobileNav />
    </nav>
  );
}
