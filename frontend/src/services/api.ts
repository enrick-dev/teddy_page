import axios from 'axios';
import localStorageManager from '../utils/localStorageManager';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorageManager.getItem('@Auth:token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
