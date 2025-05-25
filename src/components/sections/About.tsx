import React from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { Profile } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';
import Skills from './Skills';

interface AboutProps {
  profile?: Profile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
  };

  const skills = profile?.skills || [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Django',
    'PostgreSQL', 'SQL', 'AWS', 'Docker', 'Git', 'GraphQL'
  ];  const education = profile?.education || [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of the People, California',
      year: '2023',
      description: 'Comprehensive study in computer science fundamentals, software engineering, algorithms, and data structures with focus on web development technologies.'
    },
    {
      degree: 'Data Science Certificate',
      institution: 'Professional Certification Program', 
      year: 'June 2023',
      description: 'Specialized training in data analysis, machine learning algorithms, statistical modeling, and data visualization techniques.'
    },
    {
      degree: 'Network and Application Security Certificate',
      institution: 'Professional Certification Program',
      year: 'December 2023',
      description: 'Advanced training in cybersecurity, network security protocols, application security, and vulnerability assessment.'
    }
  ];
  const experience = profile?.experience || [
    {
      role: 'Full Stack Software Engineer',
      company: 'TechVult',
      period: 'January 2025 - Present',
      description: 'Developing scalable web applications and software solutions using modern technologies. Contributing to full-stack development projects and implementing innovative technical solutions.'
    },
    {
      role: 'System Analyst & Head of IT',
      company: 'Tech Goip Nig. LTD',
      period: '2020 - 2024',
      description: 'Led IT operations and system analysis for 5 years. Managed infrastructure, analyzed business requirements, and implemented technology solutions to optimize operations and enhance system performance.'
    }
  ];  return (
    <section id="about" className={`section-padding transition-all duration-1000 relative ${
      theme === 'cyber' 
        ? 'bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-800' 
        : theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700'
        : 'bg-premium-gradient'
    }`}>
      {/* Background Effects */}
      {theme === 'cyber' && (
        <div className="absolute inset-0 cyber-grid opacity-20" />
      )}
      
      <div className="container-custom relative z-10 overflow-x-hidden">        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12 lg:mb-16">            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 md:mb-6 transition-all duration-500">
              <span style={{ color: `rgb(var(--text-primary))` }}>About </span>
              <span className={theme === 'cyber' ? 'neon-text' : 'gradient-text'}>Me</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `rgb(var(--text-secondary))` }}
            >
              Passionate about creating digital solutions that make a difference
            </p>
          </motion.div>          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start lg:items-center">
            {/* Left Column - Personal Info with Background Image */}            <motion.div variants={itemVariants} className="relative min-h-[600px] lg:min-h-[700px] flex">
              {/* Background Image */}
              <div 
                className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 ${
                  theme === 'cyber' ? 'opacity-50' : theme === 'dark' ? 'opacity-40' : 'opacity-70'
                }`}
                style={{
                  backgroundImage: `url('/user/mayor-3.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                  filter: theme === 'cyber' 
                    ? 'hue-rotate(180deg) saturate(0.8) contrast(1.2)' 
                    : theme === 'dark'
                    ? 'grayscale(0.5) contrast(0.8)'
                    : 'grayscale(0.3) brightness(1.1)',
                }}
              />
                {/* Overlay for better text readability */}
              <div 
                className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                  theme === 'cyber' 
                    ? 'bg-gradient-to-br from-cyan-900/60 via-slate-900/50 to-purple-900/60' 
                    : theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70'
                    : 'bg-premium-card backdrop-blur-sm shadow-premium-lg'
                }`}
              />{/* Content with proper z-index */}
              <div className="relative z-10 w-full flex flex-col justify-center items-center p-8">
                <div className="space-y-6 max-w-md text-justify">
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: `rgb(var(--text-primary))` }}
                >
                  {profile?.bio || 
                    "I'm a passionate full-stack developer with over 5 years of experience creating web applications that solve real-world problems. I love turning complex requirements into simple, elegant solutions."}
                </p>
                
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: `rgb(var(--text-primary))` }}
                >
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and staying up-to-date with the latest industry trends.
                </p>                {/* Contact Info */}
                <div className="space-y-3 pt-4 text-center">
                  {profile?.location && (
                    <div className="flex items-center" style={{ color: `rgb(var(--text-secondary))` }}>
                      <span className="font-medium w-20">Location:</span>
                      <span>{profile.location}</span>
                    </div>
                  )}                  {profile?.email && (
                    <div className="flex items-center" style={{ color: `rgb(var(--text-secondary))` }}>
                      <span className="font-medium w-20">Email:</span>
                      <a 
                        href={`mailto:${profile.email}`} 
                        className={`hover:underline transition-colors ${
                          theme === 'cyber' ? 'text-cyan-300 hover:text-pink-400' : 'text-primary-600 hover:text-primary-700'
                        }`}
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}                  {profile?.phone && (
                    <div className="flex items-center" style={{ color: `rgb(var(--text-secondary))` }}>
                      <span className="font-medium w-20">Phone:</span>
                      <a 
                        href={`tel:${profile.phone}`} 
                        className={`hover:underline transition-colors ${
                          theme === 'cyber' ? 'text-cyan-300 hover:text-pink-400' : 'text-primary-600 hover:text-primary-700'
                        }`}
                      >
                        {profile.phone}
                      </a>
                    </div>
                  )}
                </div>                {/* Social Links */}
                <div className="flex justify-center space-x-4 pt-4">{profile?.linkedin_url && (
                    <motion.a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className={`transition-colors ${
                        theme === 'cyber' 
                          ? 'text-cyan-300 hover:text-pink-400 font-mono uppercase tracking-wider' 
                          : 'text-primary-600 hover:text-primary-700'
                      }`}
                    >
                      {theme === 'cyber' ? '[LinkedIn]' : 'LinkedIn'}
                    </motion.a>
                  )}                  {profile?.github_url && (
                    <motion.a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className={`transition-colors ${
                        theme === 'cyber' 
                          ? 'text-cyan-300 hover:text-pink-400 font-mono uppercase tracking-wider' 
                          : 'text-primary-600 hover:text-primary-700'
                      }`}
                    >
                      {theme === 'cyber' ? '[GitHub]' : 'GitHub'}
                    </motion.a>
                  )}
                  {profile?.website_url && (
                    <motion.a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}                      className={`transition-colors ${
                        theme === 'cyber' 
                          ? 'text-cyan-300 hover:text-pink-400 font-mono uppercase tracking-wider' 
                          : 'text-primary-600 hover:text-primary-700'
                      }`}
                    >
                      {theme === 'cyber' ? '[Website]' : 'Website'}
                    </motion.a>                  )}
                </div>
              </div>              </div>
            </motion.div>

            {/* Right Column - Skills, Education, Experience */}
            <motion.div variants={itemVariants} className="space-y-8">              {/* Skills */}
              <motion.div 
                className={`${theme === 'cyber' ? 'card-cyber' : theme === 'light' ? 'bg-premium-card shadow-premium border-premium' : 'card'} p-6 rounded-xl transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              ><div className="flex items-center mb-4">
                  <CodeBracketIcon 
                    className={`w-6 h-6 mr-3 ${
                      theme === 'cyber' ? 'text-cyan-400' : 'text-primary-600'
                    }`} 
                  />
                  <h3 
                    className="text-xl font-heading font-semibold"
                    style={{ color: `rgb(var(--text-primary))` }}
                  >
                    Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ delay: index * 0.1 }}                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 font-mono uppercase tracking-wider'
                          : theme === 'light'
                          ? 'bg-premium text-primary-700 shadow-sm border border-primary-100 hover:shadow-md hover:scale-105'
                          : 'bg-primary-100 text-primary-700'
                      }`}
                      style={{
                        boxShadow: theme === 'cyber' ? '0 0 10px rgba(6, 182, 212, 0.3)' : 'none'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>              {/* Experience */}
              <motion.div 
                className={`${theme === 'cyber' ? 'card-cyber' : theme === 'light' ? 'bg-premium-card shadow-premium border-premium' : 'card'} p-6 rounded-xl transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              ><div className="flex items-center mb-4">
                  <BriefcaseIcon 
                    className={`w-6 h-6 mr-3 ${
                      theme === 'cyber' ? 'text-green-400' : 'text-primary-600'
                    }`} 
                  />
                  <h3 
                    className="text-xl font-heading font-semibold"
                    style={{ color: `rgb(var(--text-primary))` }}
                  >
                    Experience
                  </h3>
                </div>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <motion.div 
                      key={index}                      className={`border-l-2 pl-4 ${
                        theme === 'cyber' 
                          ? 'border-cyan-400/50' 
                          : theme === 'light'
                          ? 'border-primary-300 hover:border-primary-400 transition-colors'
                          : 'border-primary-200'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 
                        className="font-semibold"
                        style={{ color: `rgb(var(--text-primary))` }}
                      >
                        {exp.role}
                      </h4>                      <p className={`font-medium ${
                        theme === 'cyber' ? 'text-cyan-300' : 'text-primary-600'
                      }`}>
                        {exp.company}
                      </p>
                      <p 
                        className="text-sm mb-2"
                        style={{ color: `rgb(var(--text-muted))` }}
                      >
                        {exp.period}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: `rgb(var(--text-secondary))` }}
                      >
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>              {/* Education */}
              <motion.div 
                className={`${theme === 'cyber' ? 'card-cyber' : theme === 'light' ? 'bg-premium-card shadow-premium border-premium' : 'card'} p-6 rounded-xl transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              ><div className="flex items-center mb-4">
                  <AcademicCapIcon 
                    className={`w-6 h-6 mr-3 ${
                      theme === 'cyber' ? 'text-purple-400' : 'text-primary-600'
                    }`} 
                  />
                  <h3 
                    className="text-xl font-heading font-semibold"
                    style={{ color: `rgb(var(--text-primary))` }}
                  >
                    Education
                  </h3>
                </div>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div 
                      key={index}                      className={`border-l-2 pl-4 ${
                        theme === 'cyber' 
                          ? 'border-purple-400/50' 
                          : theme === 'light'
                          ? 'border-purple-300 hover:border-purple-400 transition-colors'
                          : 'border-primary-200'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 
                        className="font-semibold"
                        style={{ color: `rgb(var(--text-primary))` }}
                      >
                        {edu.degree}
                      </h4>                      <p className={`font-medium ${
                        theme === 'cyber' ? 'text-purple-300' : 'text-primary-600'
                      }`}>
                        {edu.institution}
                      </p>
                      <p 
                        className="text-sm mb-2"
                        style={{ color: `rgb(var(--text-muted))` }}
                      >
                        {edu.year}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: `rgb(var(--text-secondary))` }}
                      >
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Include Skills Component */}
          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <Skills />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
