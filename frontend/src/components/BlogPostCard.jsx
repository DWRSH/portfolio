import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import { ArrowRight } from 'lucide-react';

export default function BlogPostCard({ post }) {
  // Set default values and destructure all correct props
  const {
    title = "Blog Post Title",
    slug = "blog-post-title",
    content = "No excerpt available...", 
    createdAt = "2025-10-29T00:00:00.000Z",
    featuredImage // Get the featured image URL
  } = post || {};

  // Create a simple excerpt from the content
  const excerpt = content.substring(0, 120) + '...'; // Made excerpt slightly longer

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-400/20">
      {/* Display the featured image if it exists */}
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

      {/* Padding is now inside the content div */}
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
