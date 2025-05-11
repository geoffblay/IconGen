"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="w-full mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            IconGen
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* <div className="flex items-center space-x-4"> */}
            {user ? (
              <>
                <Link to="/generate">
                  <Button variant="ghost">Generate</Button>
                </Link>
                <Link to="/account">
                  <Button variant="ghost">Account</Button>
                </Link>
                <Button 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          {/* </div> */}
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
              {user ? (
                <>
                  <Link to="/generate">
                    <Button variant="outline" className="w-full">Generate</Button>
                  </Link>
                  <Link to="/account">
                    <Button variant="outline" className="w-full">Account</Button>
                  </Link>
                  <Button 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="w-full"
                  >
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Sign in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
