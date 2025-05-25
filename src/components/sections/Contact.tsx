import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { contactAPI, ContactMessage, Profile } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';

interface ContactProps {
  profile?: Profile;
}

// Form validation schema
const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactMessage>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactMessage) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await contactAPI.sendMessage(data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: profile?.email || 'mayorwizy@gmail.com',
      href: `mailto:${profile?.email || 'mayorwizy@gmail.com'}`,
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: profile?.phone || '+234 (803) 886-6521',
      href: `tel:${profile?.phone || '+2348038866521'}`,
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: profile?.location || 'Abuja (FCT), NG',
      href: null,
    },
  ];
  return (    <section id="contact" className={`section-padding relative transition-all duration-1000 ${
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
              <span style={{ color: `rgb(var(--text-primary))` }}>Get In </span>
              <span className={theme === 'cyber' ? 'neon-text' : 'gradient-text'}>Touch</span>
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: `rgb(var(--text-secondary))` }}
            >
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className={`text-2xl font-heading font-semibold mb-6 transition-all duration-300 ${
                  theme === 'cyber' ? 'text-cyan-300' : ''
                }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                  Let's Start a Conversation
                </h3>
                <p 
                  className="text-lg mb-8"
                  style={{ color: `rgb(var(--text-secondary))` }}
                >
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hello, I'll do my best to get back to you!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      theme === 'cyber'
                        ? 'bg-cyan-500/20 border border-cyan-500/30 glow-box'
                        : theme === 'dark'
                        ? 'bg-primary-500/20 border border-primary-400/40'
                        : 'bg-primary-100 border border-primary-200 shadow-md hover:shadow-lg hover:scale-105'
                    }`}>
                      <item.icon className={`w-6 h-6 transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'text-cyan-300'
                          : theme === 'dark'
                          ? 'text-primary-300'
                          : 'text-primary-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-medium transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                        {item.label}
                      </h4>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`transition-all duration-300 hover:scale-105 ${
                            theme === 'cyber'
                              ? 'text-neon-pink hover:text-neon-blue'
                              : theme === 'dark'
                              ? 'text-gray-300 hover:text-primary-400'
                              : 'text-gray-600 hover:text-primary-600'
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: `rgb(var(--text-secondary))` }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}              <div className={`pt-8 border-t transition-all duration-300 ${
                theme === 'cyber'
                  ? 'border-cyan-500/30'
                  : theme === 'dark'
                  ? 'border-slate-600'
                  : 'border-gray-200 border-premium'
              }`}>
                <h4 className={`font-medium mb-4 transition-all duration-300 ${
                  theme === 'cyber' ? 'text-cyan-300' : ''
                }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {profile?.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        theme === 'cyber'
                          ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300 hover:bg-blue-500/30 glow-box'
                          : theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span className="sr-only">LinkedIn</span>
                      Li
                    </a>
                  )}
                  {profile?.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        theme === 'cyber'
                          ? 'bg-gray-500/20 border border-gray-400/40 text-gray-300 hover:bg-gray-500/30 glow-box'
                          : theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-900 text-white'
                          : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span className="sr-only">GitHub</span>
                      GH
                    </a>
                  )}
                  {profile?.website_url && (
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        theme === 'cyber'
                          ? 'bg-purple-500/20 border border-purple-400/40 text-purple-300 hover:bg-purple-500/30 glow-box'
                          : theme === 'dark'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span className="sr-only">Website</span>
                      W
                    </a>
                  )}
                </div>
              </div>
            </motion.div>            {/* Contact Form */}
            <motion.div variants={itemVariants}>              <div className={`p-8 transition-all duration-500 overflow-hidden ${
                theme === 'cyber' 
                  ? 'card-cyber hover:shadow-cyber border-cyan-500/20' 
                  : theme === 'light'
                  ? 'bg-premium-card shadow-premium-lg border-premium rounded-xl hover:shadow-premium-xl'
                  : 'card hover:shadow-xl'
              }`}>
                {/* Cyber effects */}
                {theme === 'cyber' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-cyber-700/5" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
                  </>
                )}
                
                <div className="relative z-10">
                  <h3 className={`text-2xl font-heading font-semibold mb-6 transition-all duration-300 ${
                    theme === 'cyber' ? 'text-cyan-300' : ''
                  }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                    Send Message
                  </h3>

                  {/* Submit Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 border rounded-lg flex items-center transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'bg-green-500/20 border-green-400/40 text-green-300'
                          : theme === 'dark'
                          ? 'bg-green-500/20 border-green-400/40 text-green-300'
                          : 'bg-green-50 border-green-200 text-green-800'
                      }`}
                    >
                      <CheckCircleIcon className="w-5 h-5 mr-2" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-6 p-4 border rounded-lg flex items-center transition-all duration-300 ${
                        theme === 'cyber'
                          ? 'bg-red-500/20 border-red-400/40 text-red-300'
                          : theme === 'dark'
                          ? 'bg-red-500/20 border-red-400/40 text-red-300'
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                      Failed to send message. Please try again or contact me directly.
                    </motion.div>
                  )}                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                        Your Name *
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                          errors.name 
                            ? theme === 'cyber'
                              ? 'border-red-400/40 bg-red-500/10 text-red-300'
                              : theme === 'light'
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : 'border-red-300 bg-red-50'
                            : theme === 'cyber'
                            ? 'border-cyan-500/30 bg-cyber-800/50 text-cyan-100 focus:ring-cyan-500/50 focus:border-cyan-400'
                            : theme === 'dark'
                            ? 'border-slate-600 bg-slate-700/50 text-gray-100 focus:ring-primary-500/50 focus:border-primary-400'
                            : 'border-gray-300 bg-white text-gray-900 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:border-gray-400'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className={`mt-1 text-sm transition-all duration-300 ${
                          theme === 'cyber' ? 'text-red-300' : 'text-red-600'
                        }`}>{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                          errors.email 
                            ? theme === 'cyber'
                              ? 'border-red-400/40 bg-red-500/10 text-red-300'
                              : theme === 'light'
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : 'border-red-300 bg-red-50'
                            : theme === 'cyber'
                            ? 'border-cyan-500/30 bg-cyber-800/50 text-cyan-100 focus:ring-cyan-500/50 focus:border-cyan-400'
                            : theme === 'dark'
                            ? 'border-slate-600 bg-slate-700/50 text-gray-100 focus:ring-primary-500/50 focus:border-primary-400'
                            : 'border-gray-300 bg-white text-gray-900 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:border-gray-400'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className={`mt-1 text-sm transition-all duration-300 ${
                          theme === 'cyber' ? 'text-red-300' : 'text-red-600'
                        }`}>{errors.email.message}</p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                        Subject *
                      </label>
                      <input
                        {...register('subject')}
                        type="text"
                        id="subject"                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                          errors.subject 
                            ? theme === 'cyber'
                              ? 'border-red-400/40 bg-red-500/10 text-red-300'
                              : theme === 'light'
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : 'border-red-300 bg-red-50'
                            : theme === 'cyber'
                            ? 'border-cyan-500/30 bg-cyber-800/50 text-cyan-100 focus:ring-cyan-500/50 focus:border-cyan-400'
                            : theme === 'dark'
                            ? 'border-slate-600 bg-slate-700/50 text-gray-100 focus:ring-primary-500/50 focus:border-primary-400'
                            : 'border-gray-300 bg-white text-gray-900 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:border-gray-400'
                        }`}
                        placeholder="Project Discussion"
                      />
                      {errors.subject && (
                        <p className={`mt-1 text-sm transition-all duration-300 ${
                          theme === 'cyber' ? 'text-red-300' : 'text-red-600'
                        }`}>{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                        theme === 'cyber' ? 'text-cyan-300' : ''
                      }`} style={{ color: theme === 'cyber' ? undefined : `rgb(var(--text-primary))` }}>
                        Message *
                      </label>
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={6}                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent resize-none ${
                          errors.message 
                            ? theme === 'cyber'
                              ? 'border-red-400/40 bg-red-500/10 text-red-300'
                              : theme === 'light'
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : 'border-red-300 bg-red-50'
                            : theme === 'cyber'
                            ? 'border-cyan-500/30 bg-cyber-800/50 text-cyan-100 focus:ring-cyan-500/50 focus:border-cyan-400'
                            : theme === 'dark'
                            ? 'border-slate-600 bg-slate-700/50 text-gray-100 focus:ring-primary-500/50 focus:border-primary-400'
                            : 'border-gray-300 bg-white text-gray-900 focus:ring-primary-500 focus:border-primary-500 shadow-sm hover:border-gray-400'
                        }`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && (
                        <p className={`mt-1 text-sm transition-all duration-300 ${
                          theme === 'cyber' ? 'text-red-300' : 'text-red-600'
                        }`}>{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full transition-all duration-300 hover:scale-105 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      } ${
                        theme === 'cyber'
                          ? 'btn-cyber bg-gradient-to-r from-neon-blue to-neon-pink text-white'
                          : 'btn-primary'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                          Send Message
                        </div>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
