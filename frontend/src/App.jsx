import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

// Import Public Layout Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Import Public Pages
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostDetailPage from './pages/BlogPostDetailPage.jsx';

// Import Admin Components and Pages
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminProjectsPage from './pages/admin/AdminProjectsPage.jsx';
import AdminBlogPage from './pages/admin/AdminBlogPage.jsx'; 

/* ─── PRO FEATURE 1: GOOGLE ANALYTICS TRACKER ────────────────────────────── */
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    // Make sure gtag is available (loaded in index.html)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag("config", "G-ZK8PEXLXQW", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null; // Invisible component
}

/* ─── PRO FEATURE 2: SCROLL RESTORATION ────────────────────────────────────
   Ensures that navigating to a new page always starts at the very top, 
   fixing the classic SPA "stuck at the bottom" scroll bug. 
──────────────────────────────────────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/* ─── PUBLIC LAYOUT ────────────────────────────────────────────────────────
   Removed restrictive max-width and padding constraints from <main>. 
   Now, individual pages can dictate their own edge-to-edge layouts and 
   ambient background effects perfectly.
──────────────────────────────────────────────────────────────────────────── */
const PublicLayout = () => (
  // Using our exact theme background color instead of standard slate
  <div style={{ backgroundColor: '#05070a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

// --- MAIN APP ENTRY POINT ---
function App() {
  return (
    <>
      {/* Invisible Utility Components */}
      <TrackPageViews />
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostDetailPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
