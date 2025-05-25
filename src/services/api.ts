import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Types
export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  skills: string[];
  education: any[];
  experience: any[];
  resume_url: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image: string;
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  company: string;
  role: string;
  testimonial: string;
  image: string;
  rating: number;
  project_title: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Functions
export const profileAPI = {
  getProfile: () => api.get<Profile>('/profile/'),
};

export const projectsAPI = {
  getProjects: () => api.get<Project[]>('/projects/'),
  getFeaturedProjects: () => api.get<Project[]>('/projects/?is_featured=true'),
};

export const clientsAPI = {
  getClients: () => api.get<Client[]>('/clients/'),
};

export const blogAPI = {
  getPosts: () => api.get<BlogPost[]>('/blog/'),
  getPublishedPosts: () => api.get<BlogPost[]>('/blog/?is_published=true'),
  getPost: (slug: string) => api.get<BlogPost>(`/blog/${slug}/`),
};

export const contactAPI = {
  sendMessage: (data: ContactMessage) => api.post('/contact/', data),
};

export default api;
