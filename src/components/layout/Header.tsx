import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'cyber'
            ? 'glass-cyber border-b border-neon-blue/30'
            : theme === 'dark'
            ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50'
            : 'bg-white/95 backdrop-blur-md shadow-premium border-b border-slate-200/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className={`text-2xl font-heading font-bold transition-all duration-300 ${
                theme === 'cyber'
                  ? 'cyber-text text-neon-blue animate-neon-flicker'
                  : 'gradient-text'
              }`}
            >
              {theme === 'cyber' ? 'PORTFOLIO.EXE' : 'Portfolio'}
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}                  className={`font-medium transition-all duration-300 hover:scale-105 ${
                    theme === 'cyber'
                      ? 'text-cyan-300 hover:text-neon-blue font-mono uppercase text-sm tracking-wider hover:text-shadow'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-primary-400'
                      : 'text-slate-700 hover:text-purple-600 hover:text-shadow-premium font-semibold'
                  }`}
                >
                  {theme === 'cyber' ? `[${item.name}]` : item.name}
                </motion.a>
              ))}
              
              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="ml-4"
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}              className={`transition-all duration-300 ${
                theme === 'cyber'
                  ? 'text-neon-blue hover:text-neon-pink'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-primary-400'
                  : 'text-slate-700 hover:text-purple-600'
              }`}
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}              className={`md:hidden transition-all duration-300 ${
                theme === 'cyber'
                  ? 'glass-cyber border-t border-neon-blue/30'
                  : theme === 'dark'
                  ? 'bg-slate-800/95 backdrop-blur-sm border-t border-slate-700'
                  : 'bg-white/95 backdrop-blur-md border-t border-slate-200/60 shadow-premium'
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}                    className={`block px-3 py-2 font-medium transition-all duration-300 ${
                      theme === 'cyber'
                        ? 'text-cyan-300 hover:text-neon-blue font-mono uppercase tracking-wider'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:text-primary-400'
                        : 'text-slate-700 hover:text-purple-600 hover:bg-purple-50/80 rounded-lg font-semibold'
                    }`}
                  >
                    {theme === 'cyber' ? `[${item.name}]` : item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
