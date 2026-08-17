import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage'
import CountriesPage from './pages/CountriesPage'
import CountryDetailPage from './pages/CountryDetailPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import FavoritesPage from './pages/FavoritesPage'
import WishlistPage from './pages/WishlistPage'
import VisitedPage from './pages/VisitedPage'
import FeedbackPage from './pages/FeedbackPage'
import NotFoundPage from './pages/NotFoundPage'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/country/:id" element={<CountryDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/visited" element={<ProtectedRoute><VisitedPage /></ProtectedRoute>} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
