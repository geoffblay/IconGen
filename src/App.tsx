import './App.css'
import HeroSection from './components/ui/hero-section'
import Header from './components/ui/header'
import ExamplesSection from './components/ui/examples-section'
import PricingSection from './components/ui/pricing-section'
import Footer from './components/ui/footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <ExamplesSection />
      <PricingSection />
      <Footer />
    </div>
  )
}

export default App
