import React, { useEffect } from 'react'; // <-- useEffect import karein
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'; // <-- useLocation import karein

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

// --- YEH TRACKING COMPONENT ADD KAREIN ---
// Yeh component har page change ko track karega
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    // Check karein ki gtag function maujood hai (jo index.html se aa raha hai)
    if (window.gtag) {
      window.gtag("config", "G-ZK8PEXLXQW", { // Aapki specific ID
        page_path: location.pathname + location.search,
      });
    }
  }, [location]); // Har baar location badalne par yeh run hoga

  return null; // Yeh screen par kuch nahi dikhata
}
// --- END TRACKING COMPONENT ---


// Public-facing layout (Ismein koi badlaav nahi hai)
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-slate-900 text-white">
    <Header />
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <Outlet /> {/* Public pages will be rendered here */}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <> {/* Ek Fragment use karein taaki 2 components return kar sakein */}
      {/* --- TRACKER KO YAHAN CALL KAREIN --- */}
      <TrackPageViews />

      {/* Aapka Routes component jaisa tha waisa hi hai */}
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
