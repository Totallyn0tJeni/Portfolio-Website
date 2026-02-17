import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = {
  primary: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved ? JSON.parse(saved) : { primary: "262 83% 58%" }; // Default light purple
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", JSON.stringify(theme));
    document.documentElement.style.setProperty("--primary", theme.primary);
    // Also update ring color to match primary
    document.documentElement.style.setProperty("--ring", theme.primary);
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
