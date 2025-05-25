import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
// import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import { LoadingPage } from './components/ui/LoadingSpinner';
import ParticleSystem from './components/ui/ParticleSystem';
import { usePortfolioData } from './hooks/usePortfolioData';

function AppContent() {
  const { profile, projects, clients, blogPosts, loading, error } = usePortfolioData();

  if (loading) {
    return <LoadingPage />;
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
      {/* Global Particle System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ParticleSystem particleCount={50} />
      </div>
      
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
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
