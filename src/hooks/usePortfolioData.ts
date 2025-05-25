import { useState, useEffect } from 'react';
import { 
  profileAPI, 
  projectsAPI, 
  clientsAPI, 
  blogAPI,
  Profile,
  Project,
  Client,
  BlogPost
} from '../services/api';

interface UsePortfolioDataReturn {
  profile: Profile | null;
  projects: Project[];
  clients: Client[];
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const usePortfolioData = (): UsePortfolioDataReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [profileRes, projectsRes, clientsRes, blogRes] = await Promise.allSettled([
        profileAPI.getProfile(),
        projectsAPI.getProjects(),
        clientsAPI.getClients(),
        blogAPI.getPublishedPosts(),
      ]);

      // Handle profile data
      if (profileRes.status === 'fulfilled') {
        setProfile(profileRes.value.data);
      } else {
        console.warn('Failed to fetch profile:', profileRes.reason);
      }

      // Handle projects data
      if (projectsRes.status === 'fulfilled') {
        setProjects(projectsRes.value.data);
      } else {
        console.warn('Failed to fetch projects:', projectsRes.reason);
      }

      // Handle clients data
      if (clientsRes.status === 'fulfilled') {
        setClients(clientsRes.value.data);
      } else {
        console.warn('Failed to fetch clients:', clientsRes.reason);
      }

      // Handle blog posts data
      if (blogRes.status === 'fulfilled') {
        setBlogPosts(blogRes.value.data);
      } else {
        console.warn('Failed to fetch blog posts:', blogRes.reason);
      }

    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError('Failed to load portfolio data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    profile,
    projects,
    clients,
    blogPosts,
    loading,
    error,
    refetch,
  };
};
