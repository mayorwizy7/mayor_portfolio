import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Project } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';
import ImageModal from '../ui/ImageModal';

interface ProjectsProps {
  projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<{ isOpen: boolean; imageUrl: string; title: string; alt: string }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    alt: ''
  });

  // Function to handle image click
  const handleImageClick = (project: Project) => {
    setModalImage({
      isOpen: true,
      imageUrl: project.image || '/api/placeholder/600/400',
      title: project.title,
      alt: `${project.title} project screenshot`
    });
  };
  // Function to close modal
  const closeModal = () => {
    setModalImage({
      isOpen: false,
      imageUrl: '',
      title: '',
      alt: ''
    });
  };
  // Debug effect to log filter changes
  useEffect(() => {
    console.log('Filter changed to:', filter);
  }, [filter]);
  // Ensure projects is always an array and use defaults if empty
  const projectsArray = Array.isArray(projects) && projects.length > 0 ? projects : [];

  // Default projects if none provided
  const defaultProjects: Project[] = [
    {
      id: 1,
      title: 'DOSA Foundation',
      description: 'A comprehensive non-profit platform featuring automated donation management, real-time payment processing, volunteer coordination system, and event management. Built with scalable architecture, secure authentication, and admin analytics dashboard for tracking donations and impact metrics.',
      tech_stack: ['React', 'Node.js', 'MongoDB', 'Express', 'PayPal API', 'Stripe', 'JWT', 'Material-UI', 'AWS S3', 'Cloudinary', 'Socket.io'],
      github_url: 'https://github.com/mayorishere',
      live_url: 'https://dosafoundation.org',
      image: '/projects-images/dosafoundation-org.png',
      is_featured: true,
      order: 1,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
    {
      id: 2,
      title: 'Funmilola Real Estate',
      description: 'Enterprise-grade real estate platform with advanced property search algorithms, interactive property maps, virtual tour integration, and comprehensive CRM system. Features automated lead management, property valuation tools, and multi-language support with optimized SEO performance.',
      tech_stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'MapBox API', 'Cloudinary', 'NextAuth.js', 'Vercel', 'React Hook Form'],
      github_url: 'https://github.com/mayorishere',
      live_url: 'https://funmilolarealestate.net',
      image: '/projects-images/funmilolarealestate-net.png',
      is_featured: true,
      order: 2,
      created_at: '2024-01-02',
      updated_at: '2024-01-02',
    },
    {
      id: 3,
      title: 'TechVault Platform',
      description: 'Professional technology consulting platform showcasing digital transformation services with sophisticated animations, interactive service showcases, and client portal integration. Built with modern design principles, performance optimization, and advanced micro-interactions.',
      tech_stack: ['React', 'TypeScript', 'Framer Motion', 'Firebase', 'Stripe', 'GSAP', 'Three.js', 'Tailwind CSS', 'Vite', 'React Router'],
      github_url: 'https://github.com/mayorishere',
      live_url: 'https://tchvult.com',
      image: '/projects-images/tchvult.com.png',
      is_featured: true,
      order: 3,
      created_at: '2024-01-03',
      updated_at: '2024-01-03',    },
    {
      id: 4,
      title: 'G4MG Pharma',
      description: 'Comprehensive pharmaceutical management platform featuring inventory tracking, prescription management, patient records, regulatory compliance tools, and integrated billing system. Built with robust security measures, audit trails, and real-time analytics for optimal pharmacy operations.',
      tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Express', 'TypeScript', 'Material-UI', 'JWT', 'Sequelize', 'AWS', 'Docker'],
      github_url: 'https://github.com/mayorishere',
      live_url: 'https://g4mgpharma.com',
      image: '/projects-images/g4mgpharma.com',
      is_featured: true,
      order: 4,
      created_at: '2024-01-04',
      updated_at: '2024-01-04',
    }
  ];// Use actual projects if available, otherwise use defaults
  const currentProjects = projectsArray.length > 0 ? projectsArray : defaultProjects;
    // Get unique tech stacks for filtering from current projects
  const allTechStacks = currentProjects.flatMap(project => project.tech_stack || []);
  const uniqueTechStacks = Array.from(new Set(allTechStacks));

  // Debug logging
  console.log('=== FILTER DEBUG ===');
  console.log('Current filter:', filter);
  console.log('Current projects count:', currentProjects.length);
  console.log('All tech stacks:', allTechStacks);
  console.log('Unique tech stacks:', uniqueTechStacks);

  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? currentProjects 
    : currentProjects.filter(project => 
        project.tech_stack?.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  console.log('Filtered projects count:', filteredProjects.length);
  console.log('Filtered project titles:', filteredProjects.map(p => p.title));

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
    },  };

  const displayProjects = filteredProjects;
  return (    <section id="projects" className={`section-padding relative transition-all duration-1000 ${
      theme === 'cyber' 
        ? 'bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-800' 
        : theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700'
        : 'bg-premium bg-gradient-to-br from-white via-slate-50/30 to-purple-50/40'
    }`}>
      {/* Cyber grid overlay */}
      {theme === 'cyber' && (
        <div className="absolute inset-0 cyber-grid opacity-20" />
      )}
      
      <div className="container-custom relative z-10">        <motion.div
          key={filter} // Force re-animation when filter changes
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Changed from whileInView to animate for immediate trigger
          viewport={{ once: true, amount: 0.3 }}
        >          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-6 transition-all duration-500 ${
              theme === 'cyber' ? 'neon-text' : ''
            }`}>
              <span style={{ color: `rgb(var(--text-primary))` }}>My </span>
              <span className={theme === 'cyber' ? 'neon-text' : 'gradient-text'}>Projects</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto mb-8"
              style={{ color: `rgb(var(--text-secondary))` }}
            >
              Here are some of my recent projects that showcase my skills and creativity
            </p>            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === 'all'
                    ? theme === 'cyber'
                      ? 'btn-cyber bg-neon-blue/20 text-neon-blue border-neon-blue'
                      : theme === 'dark'
                      ? 'btn-primary text-white'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-premium-lg border border-purple-500/30'
                    : theme === 'cyber'
                    ? 'bg-transparent border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200'
                    : theme === 'dark'
                    ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600'
                    : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200/80 shadow-premium hover:shadow-premium-lg hover:border-purple-300/50'
                }`}
              >
                All
              </button>
              {uniqueTechStacks.slice(0, 5).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === tech
                      ? theme === 'cyber'
                        ? 'btn-cyber bg-neon-blue/20 text-neon-blue border-neon-blue'
                        : theme === 'dark'
                        ? 'btn-primary text-white'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-premium-lg border border-purple-500/30'
                      : theme === 'cyber'
                      ? 'bg-transparent border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200'
                      : theme === 'dark'
                      ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-slate-600'
                      : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200/80 shadow-premium hover:shadow-premium-lg hover:border-purple-300/50'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayProjects.map((project, index) => (              <motion.div
                key={project.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className={`group cursor-pointer transition-all duration-500 overflow-hidden ${
                  theme === 'cyber' 
                    ? 'card-cyber hover:shadow-cyber border-cyan-500/20' 
                    : theme === 'dark'
                    ? 'card hover:shadow-xl'
                    : 'card shadow-premium hover:shadow-premium-xl bg-premium-card border-premium'
                }`}
              >{/* Project Image */}
                <div 
                  className="relative overflow-hidden h-48 cursor-pointer group/image"
                  onClick={() => handleImageClick(project)}
                >
                  <img
                    src={project.image || '/api/placeholder/600/400'}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Zoom overlay indicator */}                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredProject === project.id ? 1 : 0 
                    }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      theme === 'cyber'
                        ? 'bg-gradient-to-br from-cyber-900/90 to-cyber-800/90'
                        : theme === 'dark'
                        ? 'bg-black/70'
                        : 'bg-gradient-to-br from-white/95 via-slate-50/90 to-purple-50/95 backdrop-blur-sm'
                    }`}
                  >{/* View icon */}                    <div className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                      theme === 'cyber'
                        ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                        : theme === 'dark'
                        ? 'bg-white/20 text-white border border-white/40'
                        : 'bg-gradient-to-br from-white/90 to-slate-100/80 text-slate-700 border border-slate-200/60 shadow-premium'
                    }`}>
                      <EyeIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="text-center">                      <p className={`text-sm font-medium mb-2 ${
                        theme === 'cyber' ? 'text-cyan-300' : theme === 'dark' ? 'text-white' : 'text-slate-700'
                      }`}>
                        Click to view full image
                      </p>
                      <div className="flex items-center justify-center space-x-4">                        {/* Action buttons */}                        <button
                          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                            theme === 'cyber'
                              ? 'bg-neon-blue/20 border border-neon-blue/40 hover:bg-neon-blue/30'
                              : theme === 'dark'
                              ? 'bg-white/20 hover:bg-white/30'
                              : 'bg-gradient-to-br from-white/95 to-slate-100/90 hover:from-white hover:to-slate-50 border border-slate-200/60 shadow-premium hover:shadow-premium-lg'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(project);
                          }}
                        >
                          <EyeIcon className={`w-6 h-6 ${theme === 'light' ? 'text-slate-700' : 'text-white'}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>{/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4">                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/40 glow-box'
                          : theme === 'dark'
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-400/40'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border border-purple-500/30 shadow-premium'
                      }`}>
                        Featured
                      </span>
                    </div>
                  )}
                </div>                {/* Project Info */}
                <div className="p-6">
                  <h3 className={`text-xl font-heading font-semibold mb-3 transition-all duration-300 ${
                    theme === 'cyber'
                      ? 'text-cyan-300 group-hover:text-neon-blue'
                      : theme === 'dark'
                      ? 'text-gray-100 group-hover:text-primary-400'
                      : 'text-gray-900 group-hover:text-primary-600'
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p 
                    className="mb-4 line-clamp-3"
                    style={{ color: `rgb(var(--text-secondary))` }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack?.slice(0, 3).map((tech) => (                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          theme === 'cyber'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : theme === 'dark'
                            ? 'bg-slate-700 text-gray-300 border border-slate-600'
                            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300/50 shadow-sm hover:shadow-md hover:from-slate-50 hover:to-slate-100'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : theme === 'dark'
                          ? 'bg-slate-700 text-gray-300 border border-slate-600'
                          : 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-300/50 shadow-sm'
                      }`}>
                        +{project.tech_stack.length - 3} more
                      </span>
                    )}
                  </div>                  {/* Links */}
                  <div className="flex space-x-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-medium text-sm transition-all duration-300 hover:scale-105 ${
                          theme === 'cyber'
                            ? 'text-neon-blue hover:text-neon-pink'
                            : theme === 'dark'
                            ? 'text-primary-400 hover:text-primary-300'
                            : 'text-primary-600 hover:text-primary-700'
                        }`}
                      >
                        Live Demo
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-medium text-sm transition-all duration-300 hover:scale-105 ${
                          theme === 'cyber'
                            ? 'text-cyan-300 hover:text-cyan-200'
                            : theme === 'dark'
                            ? 'text-gray-300 hover:text-gray-200'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        Source Code
                        <CodeBracketIcon className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          {projectsArray.length > 6 && (
            <motion.div variants={itemVariants} className="text-center mt-12">
              <button className="btn-primary">
                View All Projects
              </button>
            </motion.div>
          )}        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalImage.isOpen}
        imageUrl={modalImage.imageUrl}
        title={modalImage.title}
        alt={modalImage.alt}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects;
