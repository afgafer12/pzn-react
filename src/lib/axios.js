import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: `${import.meta.env.VITE_API_ECOMMERCE_PATH}`
});

axiosIntance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default axiosIntance;