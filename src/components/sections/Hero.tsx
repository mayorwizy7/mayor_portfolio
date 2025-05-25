import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Profile } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleSystem from '../ui/ParticleSystem';

interface HeroProps {
  profile?: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { theme } = useTheme();
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const words = ['Full-Stack Developer', 'System Architect', 'Digital Innovator', 'Tech Visionary'];
    let timeout: NodeJS.Timeout;
    const currentWordText = words[currentWord];
    
    if (isTyping) {
      if (displayText.length < currentWordText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWordText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentWord]);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic background based on theme */}      <div className={`absolute inset-0 transition-all duration-1000 ${
        theme === 'cyber' 
          ? 'bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-800 cyber-grid'
          : theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700'
          : 'bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/30'
      }`} />
        {/* Enhanced Particle System for Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleSystem 
          particleCount={theme === 'cyber' ? 80 : 50} 
          connectionDistance={theme === 'cyber' ? 120 : 100}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      
      {/* Cyber scan lines effect */}
      {theme === 'cyber' && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-pink to-transparent"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-green to-transparent"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute right-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent"
            animate={{ y: ['100%', '-100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(theme === 'cyber' ? 8 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              theme === 'cyber'
                ? 'bg-gradient-to-r from-neon-blue/10 to-neon-pink/10 glow-box'
                : theme === 'dark'
                ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20'
                : 'bg-gradient-to-r from-primary-200/20 to-purple-200/20'
            }`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${10 + i * 12}%`,
              top: `${10 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container-custom relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Profile Image with enhanced effects */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative group">              <div className={`w-48 h-48 rounded-full overflow-hidden border-4 transition-all duration-500 ${
                theme === 'cyber'
                  ? 'border-neon-blue shadow-[0_0_30px_rgba(0,245,255,0.5)] glow-border'
                  : theme === 'dark'
                  ? 'border-primary-500 shadow-neon'
                  : 'border-white shadow-premium-xl ring-4 ring-purple-100/50'
              }`}>
                <img
                  src={profile?.profile_image || "/mayor.jpg"}
                  alt={`${profile?.first_name} ${profile?.last_name}`}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    theme === 'cyber' ? 'contrast-125 brightness-110 saturate-125' : ''
                  }`}
                />
                {theme === 'cyber' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 via-transparent to-neon-pink/20 opacity-60" />
                )}
              </div>
              
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`absolute -inset-2 rounded-full border-2 border-dashed ${
                  theme === 'cyber'
                    ? 'border-neon-blue/60'
                    : theme === 'dark'
                    ? 'border-primary-300'
                    : 'border-primary-300'
                }`}
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className={`absolute -inset-4 rounded-full border border-dotted ${
                  theme === 'cyber'
                    ? 'border-neon-pink/40'
                    : theme === 'dark'
                    ? 'border-purple-300/50'
                    : 'border-purple-300/50'
                }`}
              />

              {/* Cyber hologram effect */}
              {theme === 'cyber' && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0,245,255,0.3)',
                      '0 0 40px rgba(255,0,128,0.5)',
                      '0 0 20px rgba(0,245,255,0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>

          {/* Name and Title with typewriter effect */}          <motion.h1
            variants={itemVariants}
            className={`text-5xl md:text-7xl font-heading font-bold mb-4 transition-all duration-500 ${
              theme === 'cyber'
                ? 'neon-text animate-neon-flicker'
                : theme === 'dark'
                ? 'text-white'
                : 'text-slate-900 text-shadow-premium'
            }`}
          >
            Hi, I'm{' '}
            <span className={`${
              theme === 'cyber'
                ? 'cyber-text text-neon-blue'
                : 'gradient-text'
            }`}>
              {profile?.first_name || 'Godfirst'}
            </span>
          </motion.h1>

          {/* Animated typewriter text */}          <motion.div
            variants={itemVariants}
            className={`text-2xl md:text-3xl font-light mb-6 transition-all duration-500 ${
              theme === 'cyber'
                ? 'text-secondary-300 font-mono'
                : theme === 'dark'
                ? 'text-gray-300'
                : 'text-slate-700 font-medium'
            }`}
          >
            I'm a{' '}
            <span className={`font-semibold min-h-[1em] inline-block ${
              theme === 'cyber'
                ? 'text-neon-green cyber-text'
                : theme === 'dark'
                ? 'text-primary-400'
                : 'text-primary-600'
            }`}>
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={theme === 'cyber' ? 'text-neon-blue' : ''}
              >
                |
              </motion.span>
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-500 ${
              theme === 'cyber'
                ? 'text-cyan-300 font-light'
                : theme === 'dark'
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}
          >
            {profile?.bio || 
              "Creating next-generation digital experiences that push the boundaries of technology and design. Let's build the future together."}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => {
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={theme === 'cyber' ? 'btn-cyber' : 'btn-primary'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'cyber' ? 'ACCESS PORTFOLIO' : 'View My Work'}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                {theme === 'cyber' ? '>>>' : '→'}
              </motion.div>
            </motion.button>
            
            {profile?.resume_url && (
              <motion.a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className={theme === 'cyber' ? 'btn-cyber' : 'btn-secondary'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                {theme === 'cyber' ? 'DOWNLOAD_CV' : 'Download Resume'}
              </motion.a>
            )}
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToNext}
            className={`transition-all duration-300 hover:scale-110 ${
              theme === 'cyber'
                ? 'text-neon-blue hover:text-neon-pink'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-primary-400'
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <ChevronDownIcon className="w-8 h-8 mx-auto" />
              {theme === 'cyber' && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0,245,255,0.3)',
                      '0 0 20px rgba(0,245,255,0.6)',
                      '0 0 10px rgba(0,245,255,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
