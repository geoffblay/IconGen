import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { IconGenerator } from './components/IconGenerator'
import './App.css'
// import About from "./pages/About";

function App() {
  return (
    <Router>
      {/* Header shows on every page */}
      <Header />

      {/* Main content changes based on route */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI Icon Generator
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Describe the icon you want, and we'll generate it for you using AI.
            </p>
          </div>
          
          <div className="flex justify-center">
            <IconGenerator />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
