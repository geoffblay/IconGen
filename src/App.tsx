import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import Home from "./pages/Home";
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
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
