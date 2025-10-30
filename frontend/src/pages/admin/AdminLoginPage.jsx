import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Lock } from 'lucide-react';
import axios from 'axios'; // Import configured axios instance

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    try {
      console.log('Attempting login with username:', username);
      
      // Make sure we're sending the raw password, not a hash
      const loginData = {
        username: username.trim(),
        password: password.trim() // Send plain text password, server will hash it
      };
      
      console.log('Making login request...');
      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Assuming the backend sends back { token: '...' } on success
      const { token } = response.data;

      if (token) {
        localStorage.setItem('adminAuthToken', token); // Save the actual token
        navigate('/admin/dashboard'); // Redirect on successful login
      } else {
        setError('Login failed: No token received.'); // Handle case where token is missing
      }

    } catch (err) {
      console.log('Login error details:', {
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        headers: err.response?.headers
      });

      // Handle different kinds of errors
      if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data.msg || err.response.data.message || 'Invalid username or password';
        console.error('Server error response:', err.response.data);
        setError(errorMessage);
      } else if (err.request) {
        // No response received
        console.error('No response received from server');
        setError('Login failed: Could not connect to the server.');
      } else {
        // Request setup error
        console.error('Request setup error:', err.message);
        setError('An unexpected error occurred during login.');
      }
      console.error("Full login error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-slate-800 p-8 shadow-2xl shadow-cyan-500/10">
        <div className="mb-8 text-center">
          <div className="inline-block bg-cyan-500 p-3 rounded-full mb-4">
            <Code size={32} className="text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400">Access your portfolio dashboard</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-900/50 p-3 text-center text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" // Added name attribute
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required // Use required attribute directly
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="admin"
              autoComplete="username" // Added autocomplete
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" // Added name attribute
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Use required attribute directly
              className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
              placeholder="password"
              autoComplete="current-password" // Added autocomplete
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className="flex w-full justify-center gap-2 rounded-md bg-cyan-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50" // Added disabled style
          >
            <Lock size={18} />
            {loading ? 'Signing in...' : 'Sign in'} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
}

