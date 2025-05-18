import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Generate from "./pages/Generate";
import Account from "./pages/Account";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import { AuthProvider } from './contexts/AuthContext'
import Footer from "./components/ui/footer";
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import ConfirmEmail from "./pages/ConfirmEmail";
import UpdatePassword from "./pages/UpdatePassword";
import ConfirmPasswordReset from "./pages/ConfirmPasswordReset";
import ConfirmConfirmEmail from "./pages/ConfirmConfirmEmail";
function App() {
  return (
    <AuthProvider>
    <Router>
      {/* Header shows on every page */}
      <Header />

      {/* Main content changes based on route */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm-email"
              element={
                <ConfirmEmail />
              }
            />
            <Route
              path="/confirm-password-reset"
              element={
                <ConfirmPasswordReset />
              }
            />
            <Route
              path="/confirm-confirm-email"
              element={
                <ConfirmConfirmEmail />
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PrivacyPolicy />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact />
              }
            />
            <Route
              path="/generate"
              element={
                <ProtectedRoute>
                  <Generate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancel"
              element={
                <ProtectedRoute>
                  <CancelPage />
                </ProtectedRoute>
              }
            />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>

        <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
