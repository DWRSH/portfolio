import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import { ArrowRight } from 'lucide-react';
// ❗️ FIX: Hamara custom 'api' (axios) instance import karein
import api from '../../api/axios'; // (Path check kar lein, 'api.js' ya 'axios.js')


// --- COMPONENT INLINED ---
// (Yeh component wahi hai jo aapne diya tha, bilkul sahi hai)
function BlogPostCard({ post }) {
  // Set default values and destructure all correct props
  const {
    title = "Blog Post Title",
    slug = "blog-post-title",
  	content = "No excerpt available...", 
  	createdAt = "2025-10-29T00:00:00.000Z",
  	featuredImage // Get the featured image URL
  } = post || {};

  // Create a simple excerpt from the content
  const excerpt = content.substring(0, 120) + '...';

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/20">
      {featuredImage && (
        <Link to={`/blog/${slug}`} aria-label={`Read more about ${title}`}>
          <img
            src={featuredImage}
            alt={title}
          	className="w-full h-48 object-cover"
          	onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1e293b/94a3b8?text=Image+Error"; }}
        	/>
      	</Link>
      )}
    	<div className="p-6">
      	<header>
        	<time dateTime={createdAt} className="text-sm text-slate-400">
          	{formattedDate}
        	</time>
        	<h3 className="text-2xl font-bold text-white mt-2 mb-2">
          	<Link to={`/blog/${slug}`} className="hover:text-cyan-400 transition-colors">
            	{title}
          	</Link>
        	</h3>
      	</header>
      	<p className="text-slate-300 my-4">{excerpt}</p>
      	<footer className="mt-auto">
        	<Link
          	to={`/blog/${slug}`}
          	className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        	>
          	<span>Read more</span>
          	<ArrowRight size={16} />
        	</Link>
      	</footer>
    	</div>
  	</article>
  );
}
// --- END OF INLINED COMPONENT ---


// --- MAIN PAGE COMPONENT (FIXED) ---
export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ❗️ FIX: 'fetch' ko 'api.get' se badla gaya
        const response = await api.get('/blogs'); // '/api' prefix nahi hai

        // ❗️ FIX: Axios data 'response.data' mein deta hai
    	  setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array, sirf ek baar run hoga

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-white mb-8">Blog</h2>

  	  {loading && <p className="text-center text-slate-300">Loading posts...</p>}
  	  {error && <p className="text-center text-red-400">{error}</p>}

  	  {!loading && !error && posts.length > 0 && (
    	  <div className="space-y-8">
      	  {posts.map(post => (
        	  <BlogPostCard key={post._id} post={post} />
      	  ))}
    	  </div>
  	  )}

  	  {!loading && !error && posts.length === 0 && (
    	   <div className="text-center py-20 bg-slate-800 rounded-lg">
      	 	<h3 className="text-2xl text-white mb-4">No blog posts yet</h3>
      	 	<p className="text-slate-400">Your backend is connected, but no posts have been created.</p>
      	 	<p className="text-slate-400 mt-2">Go to the admin panel to write your first post!</p>
    	   </div>
  	  )}
  	</div>
  );
}
