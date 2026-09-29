import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Add a constant for the base backend URL for image paths
export const BACKEND_URL = 'http://localhost:5000'; 

export default axiosInstance;