import axios from 'axios';
import { API_BASE_URL } from '../constants/ApiConstant';
// import { getToken } from '../hooks/useToken';
import { getAuthToken } from '../constants/LocalStorage';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const auth = token ? `Bearer ${token}` : '';
    config.headers['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;