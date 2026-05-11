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
  { path: "/clubs", label: "Extracurriculars", icon: Users },
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

// ── Mobile dropdown ──────────────────────────────────────────────────────────
function MobileNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = navItems.find(i => i.path === location) ?? navItems[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="md:hidden w-full" ref={ref}>
      <div className="flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-xl border-b border-white/10">
        {/* Brand */}
        <Link href="/">
          <span className="font-display font-bold text-xl text-white shrink-0">Jenisha</span>
        </Link>

        {/* Page selector */}
        <div className="relative flex-1">
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-medium text-base"
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
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-2 left-0 right-0 z-50 rounded-xl overflow-hidden border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
              >
                {navItems.map(item => {
                  const isActive = location === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-5 py-3.5 transition-colors text-base font-medium border-l-2 ${
                        isActive
                          ? "bg-primary/15 text-white border-primary"
                          : "text-white/70 hover:bg-white/8 hover:text-white border-transparent"
                      }`}
                    >
                      <item.icon size={18} className={isActive ? "text-primary" : ""} />
                      {item.label}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white shrink-0 border border-white/10">
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

// ── Desktop nav ──────────────────────────────────────────────────────────────
export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop — full-width bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-0 bg-black/40 backdrop-blur-xl border-b border-white/10 h-16">
        {/* Brand */}
        <Link href="/">
          <span className="font-display font-bold text-2xl text-white hover:text-primary transition-colors cursor-pointer">
            Jenisha
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative group px-4 py-2 rounded-lg transition-all duration-200"
                style={isActive ? { filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.55))" } : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDesktopTab"
                    className="absolute inset-0 bg-primary/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <div
                  className={`relative flex items-center gap-2 font-medium text-base transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                  }`}
                  style={!isActive ? undefined : undefined}
                >
                  <item.icon
                    size={18}
                    className={
                      isActive
                        ? "text-primary"
                        : "group-hover:text-primary transition-colors duration-200"
                    }
                  />
                  <span className="group-hover:[filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.5))] transition-all duration-200">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Theme picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"
            >
              <Settings2 size={20} />
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

      {/* Mobile */}
      <MobileNav />
    </nav>
  );
}
