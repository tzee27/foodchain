import React, { useState } from 'react'
import { X, Star, Award, MapPin, Calendar, CheckCircle, ShoppingCart, Download, Check } from 'lucide-react'
import { Product } from '../types'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  isAuthenticated: boolean
  onLoginRequired: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  isAuthenticated, 
  onLoginRequired,
  onAddToCart 
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'supply-chain' | 'nft'>('details')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }
    
    onAddToCart(product, quantity)
    setIsAdded(true)
    
    // Reset feedback after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const handleMintNFT = () => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }
    console.log('Minting NFT certificate for:', product.name)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors bg-white/80 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2 p-8 overflow-y-auto max-h-[90vh]">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.vendor}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{product.origin}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-2">${product.price}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-white/60 backdrop-blur-sm rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white/80"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600 hover:bg-white/80"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg mb-4 transition-all duration-300 ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'glass-button'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-white/20 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'details', label: 'Details' },
                  { id: 'supply-chain', label: 'Supply Chain' },
                  { id: 'nft', label: 'NFT Certificate' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Certifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.certifications.map(cert => (
                      <div key={cert} className="flex items-center space-x-2 p-3 bg-white/40 rounded-lg">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'supply-chain' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Supply Chain Tracking</h3>
                {product.supplyChain.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 bg-white/40 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.verified ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {step.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-800">{step.step}</h4>
                        <span className="text-xs text-gray-500">{step.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{step.location}</p>
                      {step.verified && (
                        <div className="flex items-center space-x-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Blockchain Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'nft' && (
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">NFT Certificate Available</h3>
                  <p className="text-gray-600 mb-4">
                    Mint an NFT certificate to prove authenticity and ownership of this product's supply chain data.
                  </p>
                  <button
                    onClick={handleMintNFT}
                    className="glass-button flex items-center space-x-2 px-6 py-2 rounded-lg mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>Mint NFT Certificate</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Certificate Includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Complete supply chain verification</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Product authenticity guarantee</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Certification metadata</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>IPFS storage proof</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
