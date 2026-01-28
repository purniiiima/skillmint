import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5100/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Attach token automatically on every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on unauthorized
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Logging out...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ✅ Manual token helper (still useful for login)
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
