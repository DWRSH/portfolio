import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'https://port-server-i30v.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
