import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import { Client } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';

interface TestimonialsProps {
  clients?: Client[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ clients = [] }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);  // Default testimonials if none provided
  const defaultClients: Client[] = [
    {
      id: 1,
      name: 'Dan',
      company: 'DOSA Foundation',
      role: 'President/Founder',
      testimonial: 'Mayor delivered a comprehensive foundation management system that transformed how we handle donations, volunteers, and community outreach. The secure payment processing and admin dashboard have streamlined our operations significantly. Outstanding work!',
      image: '/testimonials/Dan_dosa_foundation.jpg',
      rating: 5,
      project_title: 'Foundation Management System',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
    {
      id: 2,
      name: 'Funmi',
      company: 'Funmilola Real Estate',
      role: 'Director',
      testimonial: 'The real estate platform Mayor built for us is simply phenomenal. The advanced property search, virtual tours integration, and CRM system have doubled our lead conversion rates. The responsive design and SEO optimization brought us to the top of search results.',
      image: '/testimonials/funmi.jpg',
      rating: 5,
      project_title: 'Real Estate Platform',
      created_at: '2024-01-02',
      updated_at: '2024-01-02',
    },
    {
      id: 3,
      name: 'Sam',
      company: 'G4MG Pharma',
      role: 'Director',
      testimonial: 'Working with Mayor was a game-changer for our pharmaceutical business. His technical expertise in full-stack development, combined with his strategic understanding of our business needs, resulted in a platform that exceeded all expectations. The attention to detail and code quality is exceptional.',
      image: '/testimonials/Sam-g4mg.jpg',
      rating: 5,
      project_title: 'Pharmaceutical Platform & Management System',
      created_at: '2024-01-03',
      updated_at: '2024-01-03',
    }
  ];

  const displayClients = clients.length > 0 ? clients : defaultClients;
  useEffect(() => {
    if (isAutoPlaying && displayClients.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayClients.length);
      }, 6000); // Increased from 5000 to 6000 for smoother experience
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, displayClients.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayClients.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayClients.length) % displayClients.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (displayClients.length === 0) {
    return null;
  }
  return (    <section id="testimonials" className={`section-padding relative transition-all duration-1000 ${
      theme === 'cyber' 
        ? 'bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-800' 
        : theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700'
        : 'bg-premium-gradient'
    }`}>
      {/* Cyber grid overlay */}
      {theme === 'cyber' && (
        <div className="absolute inset-0 cyber-grid opacity-20" />
      )}
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-6 transition-all duration-500 ${
              theme === 'cyber' ? 'neon-text' : ''
            }`}>
              <span style={{ color: `rgb(var(--text-primary))` }}>What Clients </span>
              <span className={theme === 'cyber' ? 'neon-text' : 'gradient-text'}>Say</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `rgb(var(--text-secondary))` }}
            >
              Don't just take my word for it - here's what my clients have to say about working with me
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div 
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother animation
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 }
                }}className={`p-8 md:p-12 text-center transition-all duration-500 overflow-hidden ${
                  theme === 'cyber' 
                    ? 'card-cyber hover:shadow-cyber border-cyan-500/20' 
                    : theme === 'light'
                    ? 'bg-premium-card shadow-premium-lg border-premium rounded-xl hover:shadow-premium-xl'
                    : 'card hover:shadow-xl'
                }`}
              >
                {/* Cyber effects */}
                {theme === 'cyber' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-cyber-700/5" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
                  </>
                )}
                
                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-6 h-6 transition-all duration-300 ${
                          i < displayClients[currentIndex].rating
                            ? theme === 'cyber'
                              ? 'text-neon-yellow glow-icon'
                              : 'text-yellow-400'
                            : theme === 'cyber'
                            ? 'text-cyber-700'
                            : theme === 'dark'
                            ? 'text-gray-600'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote 
                    className={`text-xl md:text-2xl mb-8 leading-relaxed italic transition-all duration-500 ${
                      theme === 'cyber' ? 'font-light' : ''
                    }`}
                    style={{ color: `rgb(var(--text-primary))` }}
                  >
                    <span className={theme === 'cyber' ? 'text-cyan-300' : ''}>
                      "{displayClients[currentIndex].testimonial}"
                    </span>
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex flex-col items-center">                    <div className={`w-16 h-16 rounded-full overflow-hidden mb-4 transition-all duration-500 ${
                      theme === 'cyber' 
                        ? 'ring-2 ring-neon-blue/50 shadow-lg shadow-neon-blue/25' 
                        : theme === 'light'
                        ? 'ring-2 ring-primary-200 shadow-lg hover:ring-primary-300'
                        : 'ring-2 ring-gray-200'
                    }`}>
                      <img
                        src={displayClients[currentIndex].image || '/api/placeholder/100/100'}
                        alt={displayClients[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 
                      className={`text-lg font-semibold mb-1 transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`}
                      style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}
                    >
                      {displayClients[currentIndex].name}
                    </h4>
                    <p className={`font-medium mb-1 transition-all duration-300 ${
                      theme === 'cyber'
                        ? 'text-neon-pink'
                        : theme === 'dark'
                        ? 'text-primary-400'
                        : 'text-primary-600'
                    }`}>
                      {displayClients[currentIndex].role}
                    </p>
                    <p style={{ color: `rgb(var(--text-secondary))` }}>
                      {displayClients[currentIndex].company}
                    </p>
                    {displayClients[currentIndex].project_title && (
                      <p 
                        className="text-sm mt-2"
                        style={{ color: `rgb(var(--text-muted))` }}
                      >
                        Project: {displayClients[currentIndex].project_title}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>            {/* Navigation Arrows */}
            {displayClients.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    theme === 'cyber'
                      ? 'bg-cyber-800/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyber-700/80 hover:border-cyan-400 hover:text-cyan-200 glow-box'
                      : theme === 'dark'
                      ? 'bg-slate-800/80 border border-slate-600 text-gray-300 hover:bg-slate-700/80 hover:border-slate-500'
                      : 'bg-white/90 border border-gray-200 text-gray-600 hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl backdrop-blur-sm'
                  }`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    theme === 'cyber'
                      ? 'bg-cyber-800/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyber-700/80 hover:border-cyan-400 hover:text-cyan-200 glow-box'
                      : theme === 'dark'
                      ? 'bg-slate-800/80 border border-slate-600 text-gray-300 hover:bg-slate-700/80 hover:border-slate-500'
                      : 'bg-white/90 border border-gray-200 text-gray-600 hover:bg-white hover:text-primary-600 shadow-lg hover:shadow-xl backdrop-blur-sm'
                  }`}
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>          {/* Dots Indicator */}
          {displayClients.length > 1 && (
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-3 mt-8"
            >
              {displayClients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentIndex
                      ? theme === 'cyber'
                        ? 'bg-neon-blue glow-box'
                        : theme === 'dark'
                        ? 'bg-primary-400'
                        : 'bg-primary-600'
                      : theme === 'cyber'
                      ? 'bg-cyber-700 hover:bg-cyan-500/50'
                      : theme === 'dark'
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </motion.div>
          )}          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            <div className="text-center group">
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 ${
                theme === 'cyber'
                  ? 'text-neon-blue group-hover:text-neon-pink glow-text'
                  : theme === 'dark'
                  ? 'text-primary-400 group-hover:text-primary-300'
                  : 'text-primary-600 group-hover:text-primary-700'
              }`}>
                {displayClients.length}+
              </div>
              <div 
                className="font-medium transition-all duration-300"
                style={{ color: `rgb(var(--text-secondary))` }}
              >
                Happy Clients
              </div>
            </div>
            <div className="text-center group">
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 ${
                theme === 'cyber'
                  ? 'text-neon-pink group-hover:text-neon-blue glow-text'
                  : theme === 'dark'
                  ? 'text-primary-400 group-hover:text-primary-300'
                  : 'text-primary-600 group-hover:text-primary-700'
              }`}>
                {displayClients.length * 2}+
              </div>
              <div 
                className="font-medium transition-all duration-300"
                style={{ color: `rgb(var(--text-secondary))` }}
              >
                Projects Completed
              </div>
            </div>
            <div className="text-center group">
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 ${
                theme === 'cyber'
                  ? 'text-neon-yellow group-hover:text-neon-blue glow-text'
                  : theme === 'dark'
                  ? 'text-primary-400 group-hover:text-primary-300'
                  : 'text-primary-600 group-hover:text-primary-700'
              }`}>
                5.0
              </div>
              <div 
                className="font-medium transition-all duration-300"
                style={{ color: `rgb(var(--text-secondary))` }}
              >
                Average Rating
              </div>
            </div>
            <div className="text-center group">
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-300 ${
                theme === 'cyber'
                  ? 'text-neon-green group-hover:text-neon-pink glow-text'
                  : theme === 'dark'
                  ? 'text-primary-400 group-hover:text-primary-300'
                  : 'text-primary-600 group-hover:text-primary-700'
              }`}>
                100%
              </div>
              <div 
                className="font-medium transition-all duration-300"
                style={{ color: `rgb(var(--text-secondary))` }}
              >
                Client Satisfaction
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
