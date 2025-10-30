import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Files, Newspaper, ArrowRight, Loader2 } from 'lucide-react';
// ❗️ FIX: Hamara custom 'api' (axios) instance import karein
import api from '../api/axios'; // (Path check kar lein, 'api.js' ya 'axios.js')

/**
 * Helper component ek stat card dikhane ke liye
 */
const StatCard = ({ title, value, icon, loading, colorClass }) => (
  <div className={`bg-slate-800 p-6 rounded-lg shadow-lg ${colorClass}`}>
  	<div className="flex items-center gap-4">
  	  <div className="p-3 bg-white/10 rounded-lg">
  		{React.cloneElement(icon, { size: 24 })}
  	  </div>
  	  <div>
  		<h3 className="text-sm font-medium text-slate-300 uppercase">{title}</h3>
  		{loading ? (
  		  <Loader2 size={28} className="text-white animate-spin mt-1" />
  		) : (
  		  <p className="text-3xl font-bold text-white mt-1">{value}</p>
  		)}
  	  </div>
  	</div>
  </div>
);

/**
 * Admin dashboard ka main page.
 */
export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ projectCount: 0, blogCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  	const fetchStats = async () => {
  	  try {
  		const token = localStorage.getItem('adminAuthToken');
  		if (!token) {
  		  throw new Error('No auth token found');
  		}

        // ❗️ FIX: Axios request config with auth header
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // ❗️ FIX: Replaced fetch with api.get, no '/api' prefix
  		const res = await api.get('/stats/dashboard', config);

  		if (!res.data) {
  		  throw new Error('Failed to fetch dashboard stats');
  		}

        // ❗️ FIX: Axios response is in res.data
  		const data = res.data;
  		setStats(data);
  	  } catch (err) {
        console.error("Fetch stats error:", err);
  		setError(err.response?.data?.msg || err.message);
  	  } finally {
  		setLoading(false);
  	  }
  	};

  	fetchStats();
  }, []);

  return (
  	<div className="animate-fade-in">
  	  <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

  	  {error && (
  		<div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6">
  		  <p>Error: {error}</p>
  		  <p>Stats load karne mein samasya. Kripya page ko refresh karein.</p>
  		</div>
  	  )}

  	  {/* Stats Cards Section */}
  	  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  		<StatCard
  		  title="Total Projects"
  		  value={stats.projectCount}
  		  icon={<Files className="text-cyan-400" />}
  		  loading={loading}
  		  colorClass="hover:shadow-cyan-500/20 transition-shadow"
  		/>
  		<StatCard
  		  title="Total Blog Posts"
  		  value={stats.blogCount}
  		  icon={<Newspaper className="text-purple-400" />}
  		  loading={loading}
  		  colorClass="hover:shadow-purple-500/20 transition-shadow"
  		/>
  	  </div>

  	  {/* Quick Links Section */}
  	  <h2 className="text-2xl font-semibold text-white mb-6">Quick Links</h2>
  	  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  		  
  		{/* Manage Projects Card */}
  		<div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-slate-600/20 transition-shadow">
  		  <h3 className="text-xl font-semibold text-white mb-4">Manage Projects</h3>
  		  <p className="text-slate-400 mb-6">
  			Apne portfolio projects ko add, edit, ya delete karein.
  		  </p>
  		  <Link
  			to="/admin/projects"
  			className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
  		  >
  			<span>Go to Projects</span>
  			<ArrowRight size={18} />
  		  </Link>
  		</div>

  		{/* Manage Blog Card */}
  		<div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-slate-600/20 transition-shadow">
  		  <h3 className="text-xl font-semibold text-white mb-4">Manage Blog</h3>
  		  <p className="text-slate-400 mb-6">
  			Apne blog posts ko create, edit, ya delete karein.
  		  </p>
  		  <Link
  			to="/admin/blog"
  			className="inline-flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors"
s 		  >
  			<span>Go to Blog</span>
  			<ArrowRight size={18} />
  		  </Link>
  		</div>
  	  </div>
  	</div>
  );
}
