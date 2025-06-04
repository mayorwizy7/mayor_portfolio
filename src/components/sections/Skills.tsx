import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', level: 90, category: 'Frontend', icon: '🔷', color: '#3178C6' },
  { name: 'Next.js', level: 88, category: 'Frontend', icon: '▲', color: '#000000' },
  { name: 'Vue.js', level: 85, category: 'Frontend', icon: '💚', color: '#4FC08D' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend', icon: '🎨', color: '#06B6D4' },
  
  // Backend
  { name: 'Node.js', level: 90, category: 'Backend', icon: '🟢', color: '#339933' },
  { name: 'Python', level: 88, category: 'Backend', icon: '🐍', color: '#3776AB' },
  { name: 'Django', level: 85, category: 'Backend', icon: '🌶️', color: '#092E20' },
  { name: 'Express.js', level: 87, category: 'Backend', icon: '🚂', color: '#000000' },
  { name: 'GraphQL', level: 80, category: 'Backend', icon: '🔮', color: '#E10098' },
  
  // Database
  { name: 'PostgreSQL', level: 85, category: 'Database', icon: '🐘', color: '#336791' },
  { name: 'MongoDB', level: 82, category: 'Database', icon: '🍃', color: '#47A248' },
  { name: 'Redis', level: 78, category: 'Database', icon: '🔴', color: '#DC382D' },
  
  // DevOps & Tools
  { name: 'Docker', level: 85, category: 'DevOps', icon: '🐳', color: '#2496ED' },
  { name: 'AWS', level: 80, category: 'DevOps', icon: '☁️', color: '#FF9900' },
  { name: 'Git', level: 92, category: 'DevOps', icon: '📝', color: '#F05032' },
  { name: 'Kubernetes', level: 75, category: 'DevOps', icon: '⚓', color: '#326CE5' },
];

const Skills: React.FC = () => {
  const { theme } = useTheme();
  
  const categories = ['Frontend', 'Backend', 'Database', 'DevOps'];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const getSkillsByCategory = (category: string) => {
    return skillsData.filter(skill => skill.category === category);
  };
  return (
    <section id="skills" className={`section-padding relative ${
      theme === 'light' ? 'bg-premium-gradient' : ''
    }`}>
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-heading font-bold mb-6 ${
              theme === 'cyber' ? 'neon-text' : 'gradient-text'
            }`}
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl max-w-3xl mx-auto"
            style={{ color: `rgb(var(--text-secondary))` }}
          >
            A comprehensive toolkit of modern technologies and frameworks, 
            refined through years of hands-on experience and continuous learning.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}              className={`${theme === 'cyber' ? 'card-cyber' : theme === 'light' ? 'bg-premium-card shadow-premium border-premium' : 'card'} p-6 rounded-xl transition-all duration-300 hover:shadow-premium-lg`}
              style={{ 
                background: theme === 'light' ? undefined : `rgb(var(--bg-secondary) / 0.8)`,
                borderColor: theme === 'light' ? undefined : `rgb(var(--border-color) / 0.3)`
              }}
            >
              <h3 className={`text-xl font-semibold mb-6 text-center ${
                theme === 'cyber' ? 'cyber-text' : ''
              }`}
              style={{ color: `rgb(var(--text-primary))` }}
              >
                {category}
              </h3>
              
              <div className="space-y-4">
                {getSkillsByCategory(category).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="text-2xl filter drop-shadow-lg"
                          style={{ 
                            filter: theme === 'cyber' ? 
                              `drop-shadow(0 0 8px ${skill.color})` : 
                              'none' 
                          }}
                        >
                          {skill.icon}
                        </span>
                        <span 
                          className="font-medium"
                          style={{ color: `rgb(var(--text-primary))` }}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: `rgb(var(--text-muted))` }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                      <div 
                      className={`h-2 rounded-full overflow-hidden ${
                        theme === 'light' ? 'bg-gray-200 shadow-inner' : ''
                      }`}
                      style={{ 
                        background: theme === 'light' ? undefined : `rgb(var(--bg-tertiary))` 
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full relative overflow-hidden"                        style={{ 
                          background: theme === 'cyber' ? 
                            `linear-gradient(90deg, rgb(var(--accent-glow)), ${skill.color})` :
                            theme === 'light' ?
                            `linear-gradient(90deg, ${skill.color}, rgba(99, 102, 241, 0.8))` :
                            `linear-gradient(90deg, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))`
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {theme === 'cyber' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Certifications & Achievements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-16"
        >          <motion.div 
            variants={itemVariants}
            className={`${theme === 'cyber' ? 'glass-cyber' : theme === 'light' ? 'glass-enhanced bg-premium-card shadow-premium-lg border-premium' : 'glass'} p-8 rounded-2xl transition-all duration-300`}
            style={{ 
              background: theme === 'light' ? undefined : `rgb(var(--bg-secondary) / 0.5)`,
              borderColor: theme === 'light' ? undefined : `rgb(var(--border-color) / 0.3)`
            }}
          >
            <h3 className={`text-2xl font-semibold mb-6 text-center ${
              theme === 'cyber' ? 'cyber-text' : 'gradient-text'
            }`}>
              Certifications & Achievements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'AWS Certified Solutions Architect', year: '2024', icon: '🏅' },
                { title: 'Google Cloud Professional', year: '2023', icon: '☁️' },
                { title: 'Certified Kubernetes Administrator', year: '2023', icon: '⚓' },
                { title: 'Data Science Certificate', year: '2023', icon: '📊' },
                { title: 'Network and Application Security Certificate', year: '2023', icon: '🔒' },
                { title: 'SCRUM', year: '2025', icon: '🌀' },
                { title: 'AGILE', year: '2025', icon: '⚡' },
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}                  className={`text-center p-4 rounded-lg transition-all duration-300 ${
                    theme === 'light' 
                      ? 'bg-white/80 shadow-md hover:shadow-lg border border-gray-100' 
                      : 'hover:shadow-lg'
                  }`}
                  style={{ 
                    background: theme === 'light' ? undefined : `rgb(var(--bg-primary) / 0.3)`,
                    borderColor: theme === 'light' ? undefined : `rgb(var(--border-color) / 0.2)`
                  }}
                >
                  <div className="text-3xl mb-2">{cert.icon}</div>
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: `rgb(var(--text-primary))` }}
                  >
                    {cert.title}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: `rgb(var(--text-muted))` }}
                  >
                    {cert.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
