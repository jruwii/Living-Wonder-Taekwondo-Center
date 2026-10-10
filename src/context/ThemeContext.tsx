import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Key used to remember the visitor's choice between visits.
// index.html reads this same key to set the theme before the first paint.
const STORAGE_KEY = 'lw_tkd_theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/*
 * localStorage throws instead of returning null when the browser blocks it
 * (private windows, "block all cookies"), which would crash the whole app,
 * so both helpers below fail quietly and just forget the preference.
 */
function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark'; // Dark is our default, it suits the dojang look best
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Nothing we can do; the theme still works for this visit
  }
}

/** Wraps the app and keeps track of whether we are in dark or light mode. */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // Put the matching class on <html> so Tailwind's dark: styles kick in
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    storeTheme(theme);
  }, [theme]);

  // Wrapped in useCallback so children that take it as a prop are not
  // re-rendered (or effects re-run) on every single parent render
  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/** Shortcut so components can just call useTheme() instead of useContext(...) */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }

  return context;
};
