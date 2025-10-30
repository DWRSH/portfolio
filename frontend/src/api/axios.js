import axios from 'axios';

const api = axios.create({
  // Humne logic ko theek kar diya hai:
  baseURL: import.meta.env.PROD 
    ? 'https://port-server-i30v.onrender.com' // Production: Aapka live backend URL
    : 'http://localhost:5001',                // Development: Aapka local backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
