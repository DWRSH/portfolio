import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// ❗️ FIX: Path ko theek kar diya gaya hai (ek folder upar)
import api from '../api'; // './api' ko '../api' se badal diya

// Naya component: Poora blog post dikhane ke liye
export default function BlogPostDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams(); // URL se 'slug' ko nikalne ke liye

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Naye API endpoint ko call karein jo humne banaya hai
        const response = await api.get(`/blogs/slug/${slug}`); // '/api' prefix nahi hai
        
        // Axios data 'response.data' mein deta hai
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // Jab bhi slug badlega, yeh effect dubara chalega

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <p className="text-center text-slate-300 py-20">Loading post...</p>;
  }
  
  if (error) {
    return (
      <div className="text-center text-red-400 py-20">
        <p>{error}</p>
        <Link to="/blog" className="text-cyan-400 hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
  	return <p className="text-center text-slate-300 py-20">Post not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in">
      <Link 
        to="/blog" 
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium mb-6"
      >
        <ArrowLeft size={18} />
        Back to all posts
      </Link>

      <article>
        {post.featuredImage && (
          <img 
            src={post.featuredImage}
            alt={post.title} 
          	className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
        	/>
        )}
        
    	  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
        
    	  <div className="flex items-center text-slate-400 text-sm mb-8">
    	 	<Calendar size={14} className="mr-2" />
      		<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
D   	  </div>

    	  <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white">
    		<ReactMarkdown>
        	  {post.content}
      	  </ReactMarkdown>
    	  </div>
  	  </article>
    </div>
  );
}
