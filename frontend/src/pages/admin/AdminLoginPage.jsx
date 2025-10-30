import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Lock, Loader2 } from 'lucide-react'; // ❗️ Loader2 ko import karein
// ❗️ FIX: Hardcoded 'axios' ki jagah configured 'api' instance import karein
import api from './api'; // (Path check kar lein, 'api.js' ya 'axios.js')

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    try {
      const loginData = {
        username: username.trim(),
        password: password.trim()
      };
      
      // ❗️ FIX: 'axios.post' ko 'api.post' se badla
      // ❗️ FIX: Hardcoded URL ko relative path se badla (baseURL automatically lagega)
      const response = await api.post(
        '/auth/login', // Ab yeh '/api/auth/login' ban jayega
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // ❗️ FIX: Axios data 'response.data' mein deta hai
      const { token } = response.data;

      if (token) {
        localStorage.setItem('adminAuthToken', token); 
        navigate('/admin/dashboard'); // Redirect on successful login
      } else {
        setError('Login failed: No token received.');
  	  }

  	} catch (err) {
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
    			name="username"
    			value={username}
    			onChange={(e) => setUsername(e.target.value)}
    			required
    			className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
    			placeholder="admin"
    			autoComplete="username"
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
    			name="password"
  	  		value={password}
    			onChange={(e) => setPassword(e.target.value)}
    			required
    			className="mt-1 block w-full rounded-md border-slate-700 bg-slate-900 px-3 py-2 text-white placeholder-slate-500 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
    			placeholder="password"
    			autoComplete="current-password"
    		  />
    		</div>
    		<button
    		  type="submit"
    		  disabled={loading}
    		  className="flex w-full justify-center gap-2 rounded-md bg-cyan-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50"
i   	  >
    		  {loading ? (
              <Loader2 size={20} className="animate-spin" /> // Loading icon
            ) : (
              <Lock size={18} /> // Default icon
            )}
    		  {loading ? 'Signing in...' : 'Sign in'}
    		</button>
    	  </form>
  		</div>
  	</div>
  );
}
