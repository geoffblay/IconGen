import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ExamplesSection() {
  const examples = [
    {
      title: "Streamlined Workflow",
      description: "Automate repetitive tasks and streamline your team's workflow with our intuitive interface.",
      imageUrl: "src/assets/star.svg",
    },
    {
      title: "Data Visualization",
      description: "Transform complex data into clear, actionable insights with powerful visualization tools.",
      imageUrl: "src/assets/star.svg",
    },
    {
      title: "Team Collaboration",
      description: "Enable seamless collaboration across departments with real-time updates and shared workspaces.",
      imageUrl: "src/assets/star.svg",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">See it in action</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our platform can transform your business with these examples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={example.imageUrl || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <Button variant="ghost" className="group text-sm p-0 h-auto">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
