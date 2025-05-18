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
    <header className="w-full">
      <div className="w-full mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/favicon/favicon-96x96.png" alt="IconGen" className="w-8 h-8 mr-2" />
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
                  <Button variant="ghost" className='bg-transparent border-2 border-gray-950 text-gray-950 hover:bg-purple-300'>Generate</Button>
                </Link>
                <Link to="/account">
                  <Button variant="ghost" className='bg-transparent border-2 border-gray-950 text-gray-950 hover:bg-purple-300'>Account</Button>
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
                  <Button className='bg-transparent border-2 border-gray-950 text-gray-950 hover:bg-purple-300'>Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button className='bg-gray-950 text-purple-200'>Sign up</Button>
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
            <Link to="/" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/generate" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Generate
            </Link>
            {user && (
              <Link to="/account" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
                Account
              </Link>
            )}
            <a
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/');
                // Use setTimeout to ensure the navigation completes before scrolling
                setTimeout(() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2 hover:cursor-pointer"
            >
              Pricing
            </a>
            <Link to="/privacy-policy" className="block text-sm font-medium text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsMenuOpen(false)}>
              Privacy Policy
            </Link>
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  <Button 
                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                    disabled={isSigningOut}
                    className="w-full"
                  >
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>Sign in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Sign up</Button>
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
