import axios from 'axios';

// Production aur Development dono URLs me '/api' add karein
const API_URL = import.meta.env.PROD 
  ? 'https://port-server-i30v.onrender.com/api' // Production (Live)
  : 'http://localhost:5001/api';               // Development (Local)

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
