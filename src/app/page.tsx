import Header from "@/components/header"
import HeroSection from "@/components/ui/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold">Your SaaS Website Content</h2>
          <p className="mt-4">This is where your main content would go.</p>
        </div>
      </main>
    </div>
  )
}
