import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our icon generator",
      features: [
        "3 free generations per day",
        "Preview generated icons",
        "Basic icon styles",
      ],
      nonFeatures: [
        "No downloads",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Basic",
      price: "$9.99",
      period: "per month",
      description: "Great for individuals and small projects",
      features: [
        "50 icons per month",
        "Download in PNG & SVG",
        "All icon styles",
        "Priority generation",
      ],
      nonFeatures: [],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "per month",
      description: "Perfect for professionals and teams",
      features: [
        "200 icons per month",
        "Download in all formats",
        "All icon styles",
        "Priority generation",
      ],
      nonFeatures: [],
      cta: "Get Started",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you and start improving your workflow today
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`flex-1 rounded-lg overflow-hidden border ${
                tier.popular ? "border-blue-500 shadow-lg relative" : "border-gray-200 shadow-md"
              }`}
            >
              {tier.popular && (
                <div className="bg-blue-500 text-white text-xs font-semibold py-1 text-center">MOST POPULAR</div>
              )}
              <div className={`p-6 ${tier.popular ? "bg-blue-50" : "bg-white"}`}>
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium text-gray-500">{tier.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{tier.description}</p>

                <Button
                  className={`mt-6 w-full ${tier.popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </div>

              <div className="p-6  border-t border-gray-100">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {(tier.nonFeatures || []).map((nonFeature, nonFeatureIndex) => (
                    <li key={nonFeatureIndex} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-gray-700">{nonFeature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
