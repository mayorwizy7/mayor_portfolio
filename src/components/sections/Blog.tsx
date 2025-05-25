import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon, 
  ArrowRightIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { BlogPost } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';

interface BlogProps {
  posts?: BlogPost[];
}

const Blog: React.FC<BlogProps> = ({ posts = [] }) => {
  const { theme } = useTheme();
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

  // Default blog posts if none provided
  const defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Scalable React Applications with TypeScript',
      slug: 'building-scalable-react-typescript',
      excerpt: 'Learn how to structure large React applications using TypeScript for better maintainability and developer experience.',
      content: 'Full content here...',
      featured_image: '/api/placeholder/600/400',
      tags: ['React', 'TypeScript', 'Architecture'],
      is_published: true,
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      reading_time: 8,
    },
    {
      id: 2,
      title: 'The Future of Web Development: What to Expect in 2024',
      slug: 'future-web-development-2024',
      excerpt: 'Explore the latest trends and technologies that are shaping the future of web development.',
      content: 'Full content here...',
      featured_image: '/api/placeholder/600/400',
      tags: ['Web Development', 'Trends', 'Technology'],
      is_published: true,
      created_at: '2024-01-10T14:30:00Z',
      updated_at: '2024-01-10T14:30:00Z',
      reading_time: 12,
    },
    {
      id: 3,
      title: 'Optimizing Performance in Modern Web Applications',
      slug: 'optimizing-web-app-performance',
      excerpt: 'Discover proven techniques to improve your web application performance and user experience.',
      content: 'Full content here...',
      featured_image: '/api/placeholder/600/400',
      tags: ['Performance', 'Optimization', 'UX'],
      is_published: true,
      created_at: '2024-01-05T09:15:00Z',
      updated_at: '2024-01-05T09:15:00Z',
      reading_time: 10,
    }
  ];

  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : defaultPosts;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Recent';
    }
  };

  const handlePostClick = (post: BlogPost) => {
    // In a real app, this would navigate to the blog post detail page
    console.log('Navigate to post:', post.slug);
  };
  return (
    <section id="blog" className={`section-padding transition-all duration-1000 ${
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
            <h2 className={`text-4xl md:text-5xl font-heading font-bold mb-4 transition-all duration-500 ${
              theme === 'cyber' ? 'neon-text' : ''
            }`}>
              <span style={{ color: `rgb(var(--text-primary))` }}>Latest </span>
              <span className={theme === 'cyber' ? 'neon-text' : 'gradient-text'}>Blog Posts</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `rgb(var(--text-secondary))` }}
            >
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {displayPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                onClick={() => handlePostClick(post)}
                className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'cyber' 
                    ? 'card-cyber hover:shadow-cyber border-cyan-500/20' 
                    : theme === 'light'
                    ? 'bg-premium-card shadow-premium border-premium rounded-xl hover:shadow-premium-lg'
                    : 'card hover:shadow-xl'
                }`}
              >
                {/* Featured Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.featured_image || '/api/placeholder/600/400'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                    {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                      theme === 'cyber'
                        ? 'bg-cyber-800/80 text-cyan-300 border border-cyan-500/30'
                        : 'bg-black/70 text-white backdrop-blur-sm'
                    }`}>
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {post.reading_time} min read
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                          theme === 'cyber'
                            ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                            : theme === 'light'
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            : 'bg-primary-100 text-primary-700'
                        }`}
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>                  {/* Title */}
                  <h3 
                    className={`text-xl font-heading font-semibold mb-3 transition-colors line-clamp-2 ${
                      theme === 'cyber'
                        ? 'text-cyan-300 group-hover:text-neon-blue'
                        : 'group-hover:text-primary-600'
                    }`}
                    style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p 
                    className="mb-4 line-clamp-3"
                    style={{ color: `rgb(var(--text-secondary))` }}
                  >
                    {post.excerpt}
                  </p>                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div 
                      className="flex items-center"
                      style={{ color: `rgb(var(--text-muted))` }}
                    >
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {formatDate(post.created_at)}
                    </div>
                    
                    <div className={`flex items-center transition-colors ${
                      theme === 'cyber'
                        ? 'text-neon-pink group-hover:text-neon-blue'
                        : 'text-primary-600 group-hover:text-primary-700'
                    }`}>
                      <span className="mr-1">Read More</span>
                      <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>          {/* View All Posts Button */}
          <motion.div variants={itemVariants} className="text-center">
            <button className={theme === 'cyber' ? 'btn-cyber' : 'btn-primary group'}>
              {theme === 'cyber' ? 'ACCESS_ALL_POSTS' : 'View All Posts'}
              <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>          {/* Newsletter Signup */}
          <motion.div 
            variants={itemVariants}
            className={`mt-16 rounded-2xl p-8 md:p-12 text-center transition-all duration-500 ${
              theme === 'cyber'
                ? 'bg-gradient-to-r from-cyber-700 to-cyber-600 border border-cyan-500/30 glow-box'
                : theme === 'light'
                ? 'bg-premium-gradient shadow-premium-lg border-premium'
                : 'bg-gradient-to-r from-primary-600 to-purple-600'
            }`}
          >
            <h3 className={`text-2xl md:text-3xl font-heading font-bold mb-4 ${
              theme === 'cyber' 
                ? 'neon-text' 
                : theme === 'light'
                ? 'text-slate-800'
                : 'text-white'
            }`}>
              {theme === 'cyber' ? 'STAY_CONNECTED' : 'Stay Updated'}
            </h3>
            <p className={`mb-8 max-w-2xl mx-auto ${
              theme === 'cyber'
                ? 'text-cyan-200'
                : theme === 'light'
                ? 'text-slate-600'
                : 'text-primary-100'
            }`}>
              Subscribe to my newsletter to get the latest updates on web development, 
              tutorials, and insights delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={theme === 'cyber' ? 'ENTER_EMAIL_ADDRESS' : 'Enter your email'}
                className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === 'cyber'
                    ? 'bg-cyber-800/50 border border-cyan-500/30 text-cyan-100 placeholder-cyan-400 focus:ring-cyan-500/50'
                    : theme === 'light'
                    ? 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-primary-500 shadow-sm'
                    : 'text-dark-900 placeholder-dark-400 focus:ring-white/50'
                }`}
              />
              <button className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                theme === 'cyber'
                  ? 'bg-neon-blue text-cyber-900 hover:bg-neon-pink border border-cyan-400'
                  : theme === 'light'
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
                  : 'bg-white text-primary-600 hover:bg-gray-50'
              }`}>
                {theme === 'cyber' ? 'SUBSCRIBE' : 'Subscribe'}
              </button>
            </div>
            
            <p className={`text-sm mt-4 ${
              theme === 'cyber'
                ? 'text-cyan-300'
                : theme === 'light'
                ? 'text-slate-500'
                : 'text-primary-200'
            }`}>
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
