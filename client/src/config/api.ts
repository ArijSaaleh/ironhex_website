/**
 * API Configuration
 * Uses Railway backend in production, Vite proxy in development
 */

// Get the API base URL based on environment
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ironhexwebsite-production.up.railway.app'  // Production: Railway
  : '';  // Development: Use Vite proxy (relative URLs)

/**
 * Helper function to make API calls with the correct base URL
 */
export const apiUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

/**
 * Helper function to make authenticated API calls
 */
export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  return fetch(apiUrl(path), {
    ...options,
    headers,
  });
};
