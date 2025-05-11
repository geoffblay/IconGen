import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Generate from "./pages/Generate";
import { AuthProvider } from './contexts/AuthContext'
import './App.css'
import Footer from "./components/ui/footer";
// import About from "./pages/About";

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/generate" element={<Generate />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
