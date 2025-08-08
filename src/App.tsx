import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import ProductModal from './components/ProductModal'
import DAOModal from './components/DAOModal'
import AboutSection from './components/AboutSection'
import { Product } from './types'

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isDAOModalOpen, setIsDAOModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; wallet: string } | null>(null)
  const [cartItems, setCartItems] = useState<Array<{ product: Product; quantity: number }>>([])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleLogin = (userData: { name: string; wallet: string }) => {
    setUser(userData)
    setIsAuthenticated(true)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setCartItems([]) // Clear cart on logout
  }

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, { product, quantity }]
      }
    })

    // Show success feedback
    console.log(`Added ${quantity} ${product.name} to cart`)
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header 
        isAuthenticated={isAuthenticated}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onDAOClick={() => setIsDAOModalOpen(true)}
        cartItemCount={getTotalCartItems()}
      />
      <Hero />
      <ProductGrid 
        onProductClick={handleProductClick}
        isAuthenticated={isAuthenticated}
        onLoginRequired={() => setIsAuthModalOpen(true)}
        onAddToCart={handleAddToCart}
      />
      <AboutSection />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
      
      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        isAuthenticated={isAuthenticated}
        onLoginRequired={() => {
          setIsProductModalOpen(false)
          setIsAuthModalOpen(true)
        }}
        onAddToCart={handleAddToCart}
      />
      
      <DAOModal 
        isOpen={isDAOModalOpen}
        onClose={() => setIsDAOModalOpen(false)}
        isAuthenticated={isAuthenticated}
        onLoginRequired={() => {
          setIsDAOModalOpen(false)
          setIsAuthModalOpen(true)
        }}
      />
    </div>
  )
}

export default App
