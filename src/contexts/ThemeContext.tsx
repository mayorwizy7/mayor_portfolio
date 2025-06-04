import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'cyber';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'cyber') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'cyber'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'cyber' | null;
    return savedTheme || 'cyber'; // Initialize state with saved theme or default to 'cyber'
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'cyber');
    
    // Add current theme class
    root.classList.add(theme);
    
    // For Tailwind dark mode
    if (theme === 'dark' || theme === 'cyber') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'cyber')[] = ['light', 'dark', 'cyber'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setThemeState(themes[nextIndex]);
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'cyber') => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
