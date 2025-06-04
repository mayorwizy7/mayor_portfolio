import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
// import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Resume from './components/sections/Resume'; // Import Resume component
// import { LoadingPage } from './components/ui/LoadingSpinner';
import LetterGlitchLoader from './components/ui/LetterGlitchLoader';
import ParticleSystem from './components/ui/ParticleSystem';
import LetterGlitch from './components/ui/LetterGlitch';
import { usePortfolioData } from './hooks/usePortfolioData';

function HomeContent() { // Renamed AppContent to HomeContent for clarity
  const { profile, projects, clients, loading, error } = usePortfolioData();
  const [showLoader, setShowLoader] = useState(loading);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFadeOut(true);
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1500); // match fade duration in LetterGlitchLoader
      return () => clearTimeout(timeout);
    } else {
      setShowLoader(true);
      setFadeOut(false);
    }
  }, [loading]);

  if (showLoader) {
    return <LetterGlitchLoader isVisible={!fadeOut} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <div className="text-center glass-cyber p-8 rounded-xl">
          <div className="text-accent-500 text-xl mb-4 neon-text">⚠️ Error loading portfolio</div>
          <p className="text-secondary-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-cyber"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App theme-transition relative min-h-screen animated-bg">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleSystem particleCount={50} />
      </div>
      
      {/* Letter Glitch Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[1]"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0.05 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <LetterGlitch 
          glitchColors={['#2b4539', '#61dca3', '#61b3dc', '#00ffff', '#ff00ff']}
          glitchSpeed={10}
          outerVignette={true}
          centerVignette={false}
          smooth={true}
        />
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero profile={profile || undefined} />
          <About profile={profile || undefined} />
          <Projects projects={projects} />
          <Testimonials clients={clients} />
          {/* <Blog posts={blogPosts} /> */}
          <Contact profile={profile || undefined} />
        </main>
        <Footer profile={profile || undefined} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
