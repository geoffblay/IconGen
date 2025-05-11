"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <div className="w-full mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            YourSaaS
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Pricing
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Contact
          </a>
          <Button asChild size="sm" variant="outline" className="ml-2">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm">Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2">
              Home
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2">
              Features
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2">
              Pricing
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2">
              Blog
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2">
              Contact
            </a>
            <div className="pt-2 space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
