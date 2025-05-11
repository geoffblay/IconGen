import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70" />

      <div className="relative container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Simplify your workflow with our platform
            </h1>
            <p className="text-xl text-gray-600">
              Boost productivity and streamline operations with our all-in-one solution designed for modern teams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Book a Demo
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-gray-500 mb-3">Trusted by innovative companies</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {["Company 1", "Company 2", "Company 3", "Company 4"].map((company, index) => (
                <div key={index} className="text-gray-400 font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
