import React from 'react'
import { Shield, Leaf, Users } from 'lucide-react'

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Transparent Food
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
              Supply Chain
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the future of food commerce with blockchain-verified products, 
            NFT certificates, and community-driven governance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glass-button px-8 py-3 rounded-lg text-lg font-medium">
              Explore Products
            </button>
            <button className="glass-button-secondary px-8 py-3 rounded-lg text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Products</h3>
            <p className="text-gray-600">
              Every product comes with blockchain-verified certifications and complete supply chain transparency.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Sourcing</h3>
            <p className="text-gray-600">
              Support eco-friendly vendors and track the environmental impact of your food choices.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">DAO Governance</h3>
            <p className="text-gray-600">
              Participate in community decisions about vendor approvals, product tags, and platform governance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
