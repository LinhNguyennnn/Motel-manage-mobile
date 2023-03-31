import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://ghpvina.com/api',
  timeout: 100000,
});
