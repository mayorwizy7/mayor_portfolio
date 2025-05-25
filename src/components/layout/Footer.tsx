import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { Profile } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';

interface FooterProps {
  profile?: Profile;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: profile?.linkedin_url || '#',
      icon: 'Li',
    },
    {
      name: 'GitHub',
      href: profile?.github_url || '#',
      icon: 'GH',
    },
    {
      name: 'Website',
      href: profile?.website_url || '#',
      icon: 'W',
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className={`transition-all duration-300 ${
      theme === 'cyber'
        ? 'bg-gradient-to-br from-cyber-950 via-cyber-900 to-cyber-800 text-cyan-100'
        : theme === 'dark'
        ? 'bg-dark-900 text-white'
        : 'bg-gradient-to-br from-slate-50 via-white to-purple-50/30 text-slate-800 border-t border-slate-200/60'
    }`}>
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-heading font-bold mb-4">
                <span className="gradient-text">
                  {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : 'Portfolio'}
                </span>
              </h3>
              <p className={`mb-6 max-w-md ${
                theme === 'cyber'
                  ? 'text-cyan-300'
                  : theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-slate-600'
              }`}>
                {profile?.bio?.slice(0, 150) || 
                  'Passionate full-stack developer creating amazing digital experiences. Let\'s build something incredible together.'}
                {profile?.bio && profile.bio.length > 150 && '...'}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 text-sm font-medium ${
                      theme === 'cyber'
                        ? 'bg-cyan-900/30 hover:bg-cyan-800/50 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200'
                        : theme === 'dark'
                        ? 'bg-gray-800 hover:bg-primary-600 text-white'
                        : 'bg-white hover:bg-purple-600 shadow-premium hover:shadow-premium-lg border border-slate-200/60 text-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className={`transition-colors ${
                        theme === 'cyber'
                          ? 'text-cyan-300 hover:text-cyan-100'
                          : theme === 'dark'
                          ? 'text-gray-400 hover:text-white'
                          : 'text-slate-600 hover:text-purple-600 font-medium'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className={`space-y-2 ${
                theme === 'cyber'
                  ? 'text-cyan-300'
                  : theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-slate-600'
              }`}>                {profile?.email && (
                  <p>
                    <a 
                      href={`mailto:${profile.email}`}
                      className={`transition-colors ${
                        theme === 'cyber'
                          ? 'hover:text-cyan-100'
                          : theme === 'dark'
                          ? 'hover:text-white'
                          : 'hover:text-purple-600 font-medium'
                      }`}
                    >
                      {profile.email}
                    </a>
                  </p>
                )}                {profile?.phone && (
                  <p>
                    <a 
                      href={`tel:${profile.phone}`}
                      className={`transition-colors ${
                        theme === 'cyber'
                          ? 'hover:text-cyan-100'
                          : theme === 'dark'
                          ? 'hover:text-white'
                          : 'hover:text-purple-600 font-medium'
                      }`}
                    >
                      {profile.phone}
                    </a>
                  </p>
                )}
                {profile?.location && (
                  <p>{profile.location}</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>      {/* Bottom Bar */}
      <div className={`border-t ${
        theme === 'cyber'
          ? 'border-cyan-800/50'
          : theme === 'dark'
          ? 'border-gray-800'
          : 'border-slate-200/60'
      }`}>
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-sm mb-4 md:mb-0 ${
                theme === 'cyber'
                  ? 'text-cyan-300'
                  : theme === 'dark'
                  ? 'text-gray-400'
                  : 'text-slate-600'
              }`}
            >
              © {currentYear} {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : 'Portfolio'}. 
              Made with <HeartIcon className="inline w-4 h-4 text-red-500 mx-1" /> 
              using React & Django.
            </motion.p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 transition-colors ${
                theme === 'cyber'
                  ? 'text-cyan-300 hover:text-cyan-100'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-slate-600 hover:text-purple-600 font-medium'
              }`}
            >
              <span className="text-sm">Back to top</span>
              <ArrowUpIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
