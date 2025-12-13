import axios from 'axios';
import { API_BASE_URL } from './endpoints';
const axiosClient = axios.create({
  // SỬA LẠI DÒNG NÀY: Chỉ để đến /api thôi
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;