import React, { useState } from 'react'
import { Search, Filter, Star, ShoppingCart, Award, Check } from 'lucide-react'
import { Product } from '../types'

interface ProductGridProps {
  onProductClick: (product: Product) => void
  isAuthenticated: boolean
  onLoginRequired: () => void
  onAddToCart: (product: Product, quantity?: number) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  onProductClick, 
  isAuthenticated, 
  onLoginRequired,
  onAddToCart 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set())

  const products: Product[] = [
    {
      id: '1',
      name: 'Organic Avocados',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop',
      vendor: 'Green Valley Farm',
      tags: ['organic', 'local', 'halal'],
      origin: 'California, USA',
      certifications: ['USDA Organic', 'Fair Trade'],
      description: 'Premium organic avocados grown with sustainable farming practices.',
      rating: 4.8,
      reviews: 124,
      supplyChain: [
        { id: '1', step: 'Harvested', location: 'Green Valley Farm, CA', timestamp: '2024-01-15', verified: true },
        { id: '2', step: 'Processed', location: 'Organic Processing Center', timestamp: '2024-01-16', verified: true },
        { id: '3', step: 'Shipped', location: 'Distribution Hub', timestamp: '2024-01-17', verified: true }
      ]
    },
    {
      id: '2',
      name: 'Wild Salmon Fillet',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
      vendor: 'Pacific Catch Co.',
      tags: ['wild-caught', 'sustainable', 'non-halal'],
      origin: 'Alaska, USA',
      certifications: ['MSC Certified', 'Ocean Wise'],
      description: 'Fresh wild-caught salmon from pristine Alaskan waters.',
      rating: 4.9,
      reviews: 89,
      supplyChain: [
        { id: '1', step: 'Caught', location: 'Bristol Bay, Alaska', timestamp: '2024-01-14', verified: true },
        { id: '2', step: 'Processed', location: 'Seafood Processing Plant', timestamp: '2024-01-15', verified: true },
        { id: '3', step: 'Frozen', location: 'Cold Storage Facility', timestamp: '2024-01-15', verified: true }
      ]
    },
    {
      id: '3',
      name: 'Heritage Tomatoes',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
      vendor: 'Sunrise Gardens',
      tags: ['heirloom', 'local', 'halal'],
      origin: 'Oregon, USA',
      certifications: ['Certified Organic', 'Non-GMO'],
      description: 'Colorful heirloom tomatoes with exceptional flavor and nutrition.',
      rating: 4.7,
      reviews: 156,
      supplyChain: [
        { id: '1', step: 'Planted', location: 'Sunrise Gardens, OR', timestamp: '2024-01-10', verified: true },
        { id: '2', step: 'Harvested', location: 'Sunrise Gardens, OR', timestamp: '2024-01-18', verified: true },
        { id: '3', step: 'Packaged', location: 'Farm Packaging Center', timestamp: '2024-01-18', verified: true }
      ]
    },
    {
      id: '4',
      name: 'Grass-Fed Beef',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1588347818133-6b2e6d8b1c4e?w=400&h=300&fit=crop',
      vendor: 'Prairie Ranch',
      tags: ['grass-fed', 'local', 'halal'],
      origin: 'Montana, USA',
      certifications: ['Grass-Fed Certified', 'Halal Certified'],
      description: 'Premium grass-fed beef from pasture-raised cattle.',
      rating: 4.9,
      reviews: 203,
      supplyChain: [
        { id: '1', step: 'Raised', location: 'Prairie Ranch, MT', timestamp: '2024-01-12', verified: true },
        { id: '2', step: 'Processed', location: 'Certified Processing Plant', timestamp: '2024-01-16', verified: true },
        { id: '3', step: 'Packaged', location: 'Cold Storage Facility', timestamp: '2024-01-17', verified: true }
      ]
    },
    {
      id: '5',
      name: 'Artisan Honey',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
      vendor: 'Golden Hive Apiary',
      tags: ['raw', 'local', 'halal'],
      origin: 'Vermont, USA',
      certifications: ['Raw Honey', 'Pesticide-Free'],
      description: 'Pure raw honey from local wildflower meadows.',
      rating: 4.8,
      reviews: 92,
      supplyChain: [
        { id: '1', step: 'Collected', location: 'Golden Hive Apiary, VT', timestamp: '2024-01-13', verified: true },
        { id: '2', step: 'Filtered', location: 'Honey Processing Room', timestamp: '2024-01-14', verified: true },
        { id: '3', step: 'Jarred', location: 'Packaging Facility', timestamp: '2024-01-15', verified: true }
      ]
    },
    {
      id: '6',
      name: 'Organic Blueberries',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop',
      vendor: 'Berry Best Farm',
      tags: ['organic', 'antioxidant', 'halal'],
      origin: 'Maine, USA',
      certifications: ['USDA Organic', 'Non-GMO'],
      description: 'Sweet and juicy organic blueberries packed with antioxidants.',
      rating: 4.6,
      reviews: 178,
      supplyChain: [
        { id: '1', step: 'Harvested', location: 'Berry Best Farm, ME', timestamp: '2024-01-16', verified: true },
        { id: '2', step: 'Sorted', location: 'Farm Processing Center', timestamp: '2024-01-16', verified: true },
        { id: '3', step: 'Packaged', location: 'Cold Storage Facility', timestamp: '2024-01-17', verified: true }
      ]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'halal', label: 'Halal' },
    { id: 'organic', label: 'Organic' },
    { id: 'local', label: 'Local' },
    { id: 'sustainable', label: 'Sustainable' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || product.tags.includes(selectedFilter)
    return matchesSearch && matchesFilter
  })

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }

    onAddToCart(product, 1)
    
    // Show visual feedback
    setAddedToCart(prev => new Set([...prev, product.id]))
    
    // Remove feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  return (
    <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium food products with complete transparency and blockchain verification.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                {filters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const isAdded = addedToCart.has(product.id)
            
            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="glass-card rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Award className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-medium text-gray-700">NFT</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <span className="text-lg font-bold text-green-600">${product.price}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{product.vendor}</p>
                  <p className="text-sm text-gray-500 mb-3">{product.origin}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex space-x-1">
                      {product.certifications.slice(0, 2).map(cert => (
                        <div
                          key={cert}
                          className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"
                          title={cert}
                        >
                          <Award className="w-3 h-3 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-300 ${
                      isAdded 
                        ? 'bg-green-600 text-white' 
                        : 'glass-button'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
