import { Link } from "react-router-dom";
export default function Footer() {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="w-full mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-sm text-gray-600">© {currentYear} IconGen. All rights reserved.</span>
            </div>
  
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  