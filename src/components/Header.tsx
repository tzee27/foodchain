import React from 'react'
import { ShoppingCart, User, Vote, Wallet, LogOut } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean
  user: { name: string; wallet: string } | null
  onLoginClick: () => void
  onLogout: () => void
  onDAOClick: () => void
  cartItemCount: number
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  user, 
  onLoginClick, 
  onLogout,
  onDAOClick,
  cartItemCount 
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">FoodChain</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={onDAOClick}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
            >
              <Vote className="w-4 h-4" />
              <span>DAO</span>
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
            
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="glass-button flex items-center space-x-2 px-4 py-2 rounded-lg"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
