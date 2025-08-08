import React from 'react'
import { Shield, Leaf, Users, Zap, Globe, Award } from 'lucide-react'

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About FoodChain</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the food industry through blockchain technology, 
            creating a transparent, sustainable, and trustworthy marketplace for consumers and vendors alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              FoodChain bridges the gap between consumers and food producers by leveraging Web3 technology 
              to create complete transparency in the food supply chain. Every product tells its story, 
              from farm to table, verified on the blockchain.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that consumers have the right to know exactly where their food comes from, 
              how it was produced, and whether it meets their dietary and ethical requirements.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=400&fit=crop" 
              alt="Fresh vegetables and fruits"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Blockchain Verification</h4>
            <p className="text-gray-600">
              Every product and supply chain step is verified and recorded on the blockchain, 
              ensuring immutable proof of authenticity and quality.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Practices</h4>
            <p className="text-gray-600">
              We prioritize vendors who follow sustainable farming and production practices, 
              helping consumers make environmentally conscious choices.
            </p>
          </div>

          <div className="glass-card p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Community Governance</h4>
            <p className="text-gray-600">
              Our DAO structure ensures that the community has a voice in platform decisions, 
              vendor approvals, and feature development.
            </p>
          </div>
        </div>

        <div className="glass-card p-12 rounded-2xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes FoodChain the most advanced decentralized food marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">zkLogin Authentication</h5>
                <p className="text-gray-600 text-sm">Secure wallet and social login integration</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">NFT Certificates</h5>
                <p className="text-gray-600 text-sm">Mint authenticity certificates for your purchases</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">IPFS Storage</h5>
                <p className="text-gray-600 text-sm">Decentralized storage for product data and certificates</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Smart Contracts</h5>
                <p className="text-gray-600 text-sm">Automated verification and payment processing</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">The Graph Integration</h5>
                <p className="text-gray-600 text-sm">Efficient querying of blockchain data</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Sustainability Tracking</h5>
                <p className="text-gray-600 text-sm">Monitor environmental impact and carbon footprint</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Join the Revolution</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the future of food commerce. Connect your wallet and start exploring 
            verified, sustainable products today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glass-button px-8 py-3 rounded-lg text-lg font-medium">
              Start Shopping
            </button>
            <button className="glass-button-secondary px-8 py-3 rounded-lg text-lg font-medium">
              Become a Vendor
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
