import React, { useState } from 'react'
import { X, Wallet, Mail, Github, Chrome } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userData: { name: string; wallet: string }) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleWalletConnect = async (walletType: string) => {
    setIsLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      const mockUserData = {
        name: `User_${Math.random().toString(36).substr(2, 6)}`,
        wallet: `0x${Math.random().toString(16).substr(2, 40)}`
      }
      onLogin(mockUserData)
      setIsLoading(false)
    }, 2000)
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      const mockUserData = {
        name: `${provider}_user_${Math.random().toString(36).substr(2, 4)}`,
        wallet: `0x${Math.random().toString(16).substr(2, 40)}`
      }
      onLogin(mockUserData)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-card p-8 rounded-2xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connect to FoodChain</h2>
          <p className="text-gray-600">Choose your preferred authentication method</p>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-700 mb-3">zkLogin Options</div>
          
          <button
            onClick={() => handleWalletConnect('metamask')}
            disabled={isLoading}
            className="w-full glass-button flex items-center justify-center space-x-3 p-4 rounded-lg disabled:opacity-50"
          >
            <Wallet className="w-5 h-5" />
            <span>MetaMask Wallet</span>
          </button>
          
          <button
            onClick={() => handleWalletConnect('sui')}
            disabled={isLoading}
            className="w-full glass-button flex items-center justify-center space-x-3 p-4 rounded-lg disabled:opacity-50"
          >
            <Wallet className="w-5 h-5" />
            <span>SUI Wallet</span>
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <button
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
            className="w-full glass-button flex items-center justify-center space-x-3 p-4 rounded-lg disabled:opacity-50"
          >
            <Chrome className="w-5 h-5" />
            <span>Google</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('GitHub')}
            disabled={isLoading}
            className="w-full glass-button flex items-center justify-center space-x-3 p-4 rounded-lg disabled:opacity-50"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
          
          <button
            onClick={() => handleSocialLogin('Facebook')}
            disabled={isLoading}
            className="w-full glass-button flex items-center justify-center space-x-3 p-4 rounded-lg disabled:opacity-50"
          >
            <Mail className="w-5 h-5" />
            <span>Facebook</span>
          </button>
        </div>
        
        {isLoading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
              <span>Connecting...</span>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500 text-center">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}

export default AuthModal
