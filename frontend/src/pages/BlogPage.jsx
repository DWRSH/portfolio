import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from './api'; // ❗️ 1. Apni axios file ko import karein (path check kar lein, 'api.js' ya 'axios.js')

// ... (Aapka BlogPostCard component yahaan hai) ...
// (Usmein koi change nahi)


// --- MAIN PAGE COMPONENT (FIXED) ---
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ❗️ 2. fetch() ko api.get() se badlein
        // '/api' prefix na lagayein, kyunki yeh baseURL mein hai
        const response = await api.get('/blogs'); 
        
        // ❗️ 3. Axios data ko .data property mein deta hai
        setPosts(response.data); 
      } catch (err) {
        console.error("Failed to fetch blogs:", err); // Debugging ke liye log karein
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ... (Aapka baaki ka return JSX waisa hi rahega)
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-white mb-8">Blog</h2>
      {/* ... (Baaki sab same) ... */}
S   </div>
  );
}
