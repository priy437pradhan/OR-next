// utils/config.js
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper function to create absolute URLs
export function getAbsoluteUrl(path) {
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// Helper function for API routes
export function getApiUrl(endpoint) {
  return `${API_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}