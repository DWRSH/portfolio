import React, { useState, useEffect } from 'react';
import api from './axios'; // Import your updated axios instance
import BlogPostCard from './BlogPostCard'; // Import the card you just shared

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ YAHAN CHECK KAREN: '/api' nahi hona chahiye
        const res = await api.get('/blogs'); 
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      {/* Yahaan aap apne card component ka use kar rahe hain */}
      {posts.map(post => (
        <BlogPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
