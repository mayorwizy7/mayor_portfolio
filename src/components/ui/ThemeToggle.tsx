import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', icon: SunIcon, label: 'Light', color: 'text-yellow-500' },
    { id: 'dark', icon: MoonIcon, label: 'Dark', color: 'text-blue-400' },
    { id: 'cyber', icon: BoltIcon, label: 'Cyber', color: 'text-neon-blue' },
  ] as const;

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/20"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.id;
          
          return (
            <motion.button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`
                relative p-2 rounded-full transition-all duration-300
                ${isActive 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${themeOption.label} mode`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className={`
                    absolute inset-0 rounded-full
                    ${themeOption.id === 'light' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                      : themeOption.id === 'dark'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    }
                  `}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                className="relative z-10"
                animate={isActive ? { 
                  filter: 'drop-shadow(0 0 8px currentColor)',
                  scale: 1.1 
                } : {}}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-full opacity-60 blur-xl -z-10
          ${theme === 'light' 
            ? 'bg-yellow-400' 
            : theme === 'dark'
            ? 'bg-blue-500'
            : 'bg-cyan-400'
          }
        `}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ThemeToggle;
