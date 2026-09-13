import axios from 'axios';
import { alertError } from './alert';

const axiosIntance = axios.create({
  baseURL: `${import.meta.env.VITE_API_ECOMMERCE_PATH}`
});

axiosIntance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    config.headers.Authorization = token;
  }

  if(config.method != 'get'){
    console.log('url: '+config.url);
    console.log(config.data);
  }
  return config;
});

axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response.data);
    // if (error.response?.status === 401) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
})

export default axiosIntance;