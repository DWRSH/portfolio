import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Yeh component admin routes ko protect karta hai.
 * Yeh check karta hai ki 'adminAuthToken' localStorage mein hai ya nahi.
 */
const ProtectedRoute = ({ children }) => {
  // Check karo ki auth token localStorage mein hai ya nahi
  const token = localStorage.getItem('adminAuthToken');

  if (!token) {
    // Agar token nahi hai, toh user ko login page par redirect kar do
    // 'replace' property ka use karne se user browser back button se
    // wapas protected route par nahi aa payega.
    return <Navigate to="/admin/login" replace />;
  }

  // Agar token hai, toh jo bhi children (jaise AdminLayout) hai, use render karo
  return children;
};

export default ProtectedRoute;
