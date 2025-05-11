import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$12",
      period: "per month",
      description: "Perfect for individuals and small projects",
      features: ["Up to 5 projects", "1 GB storage", "Basic analytics", "24-hour support response time", "API access"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited projects",
        "10 GB storage",
        "Advanced analytics",
        "4-hour support response time",
        "API access",
        "Team collaboration tools",
        "Custom integrations",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$79",
      period: "per month",
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited projects",
        "Unlimited storage",
        "Premium analytics",
        "1-hour support response time",
        "Priority API access",
        "Advanced team collaboration",
        "Custom integrations",
        "Dedicated account manager",
        "Custom contract",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="py-16 bg-white">
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

              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-gray-600 text-sm">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  )
}
