import axios from 'axios';

export const instance = axios.create({
  // IP address
  baseURL: 'http://localhost:8800/api',
  // baseURL: 'http://192.168.0.6:8800/api',
  timeout: 100000,
});
