import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import { ArrowRight, Search } from 'lucide-react'; // Added Search icon
// ❗️ External dependency kept as requested
import api from '../api/axios'; 


// --- COMPONENT INLINED ---
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
    <article className="bg-slate-800 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/30 border border-slate-700/50">
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
          <time dateTime={createdAt} className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">
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
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-bold group"
          >
            <span>Read more</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </footer>
      </div>
    </article>
  );
}
// --- END OF INLINED COMPONENT ---


// --- MAIN PAGE COMPONENT (WITH SEARCH LOGIC) ---
function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // State for posts after search filter
  const [searchQuery, setSearchQuery] = useState('');     // State for the search bar input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Data Fetching (Original Logic)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Using the imported 'api' to fetch data from the backend
        const response = await api.get('/blogs');
        const fetchedPosts = response.data || [];
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load posts. Please check API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Runs only once to fetch data

  // 2. Filtering Logic (Runs whenever posts or searchQuery changes)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If search query is empty, show all fetched posts
      setFilteredPosts(posts);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    
    // Filter posts based on title or content (case-insensitive)
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.content.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPosts(results);
  }, [posts, searchQuery]); // Re-run when source posts or query changes

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-4xl font-extrabold text-white mb-4 text-center">Latest Blog Articles</h2>
        <p className="text-center text-slate-400 mb-10">Discover new trends and insights in technology.</p>

        {/* --- Search Bar Implementation --- */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or content keywords..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-full py-3 pl-12 pr-6 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 shadow-lg placeholder-slate-500"
              aria-label="Search blog posts"
            />
          </div>
        </div>
        {/* ---------------------------------- */}

        {loading && (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-slate-300">Loading articles...</p>
            </div>
        )}
        
        {error && <p className="text-center text-red-400 py-10">{error}</p>}

        {!loading && !error && (
            <>
                {filteredPosts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts.map(post => (
                            <BlogPostCard key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700/50">
                        <h3 className="text-3xl text-white mb-4 font-bold">
                            {searchQuery ? "No results found" : "No blog posts yet"}
                        </h3>
                        <p className="text-slate-400">
                            {searchQuery 
                                ? `We couldn't find any articles matching "${searchQuery}". Try a different keyword.`
                                : "Your backend is connected, but no posts have been created."
                            }
                        </p>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
} 

// Ensure only one default export
export default BlogPage;
