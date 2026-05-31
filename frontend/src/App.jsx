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
import ContactPage from './pages/ContactPage.jsx'; // <-- NEW

// Import Admin Components and Pages
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminProjectsPage from './pages/admin/AdminProjectsPage.jsx';
import AdminBlogPage from './pages/admin/AdminBlogPage.jsx'; 

/* ... (TrackPageViews & ScrollToTop exactly as you have them) ... */
function TrackPageViews() { /*...*/ return null; }
function ScrollToTop() { /*...*/ return null; }

const PublicLayout = () => (
  <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
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
          <Route path="contact" element={<ContactPage />} /> {/* <-- NEW */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
