import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  changePassword: (passwords) => api.post('/auth/change-password', passwords)
};

// Loans API
export const loans = {
  create: (data) => api.post('/loans/apply', data),
  getPending: () => api.get('/loans/pending'),
  verify: (id, data) => api.post(`/loans/verify/${id}`, data),
  getDetails: (id) => api.get(`/loans/${id}`),
  updateStatus: (id, data) => api.patch(`/loans/${id}/status`, data)
};

// Members API
export const members = {
  create: (data) => api.post('/members', data),
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  update: (id, data) => api.put(`/members/${id}`, data),
  delete: (id) => api.delete(`/members/${id}`)
};

// File upload helper
export const uploadFiles = async (files, type = 'documents') => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(type, file);
  });
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

export default api; 