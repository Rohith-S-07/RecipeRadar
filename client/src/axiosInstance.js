import axios from 'axios';
import config from './config';

const API = axios.create({
  baseURL: config.BASE_URL,
});

// Attach token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
