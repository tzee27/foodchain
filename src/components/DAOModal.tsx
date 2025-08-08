import React, { useState } from 'react'
import { X, Vote, Users, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'
import { DAOProposal } from '../types'

interface DAOModalProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onLoginRequired: () => void
}

const DAOModal: React.FC<DAOModalProps> = ({ 
  isOpen, 
  onClose, 
  isAuthenticated, 
  onLoginRequired 
}) => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'create'>('proposals')
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set())

  const proposals: DAOProposal[] = [
    {
      id: '1',
      title: 'Approve New Vendor: Ocean Fresh Seafood',
      description: 'Proposal to approve Ocean Fresh Seafood as a verified vendor. They have provided all necessary certifications and sustainability documentation.',
      type: 'vendor',
      votes: { for: 1247, against: 89 },
      status: 'active',
      endDate: '2024-02-15'
    },
    {
      id: '2',
      title: 'Add "Carbon Neutral" Product Tag',
      description: 'Create a new product tag for carbon-neutral products to help environmentally conscious consumers make informed choices.',
      type: 'tag',
      votes: { for: 892, against: 156 },
      status: 'active',
      endDate: '2024-02-12'
    },
    {
      id: '3',
      title: 'Treasury Allocation for Marketing Campaign',
      description: 'Allocate 50,000 FOOD tokens from the treasury for a marketing campaign to promote sustainable farming practices.',
      type: 'treasury',
      votes: { for: 2341, against: 567 },
      status: 'passed',
      endDate: '2024-01-28'
    },
    {
      id: '4',
      title: 'Update Halal Certification Requirements',
      description: 'Proposal to update the requirements for halal certification to include additional verification steps.',
      type: 'tag',
      votes: { for: 445, against: 1123 },
      status: 'rejected',
      endDate: '2024-01-25'
    }
  ]

  if (!isOpen) return null

  const handleVote = (proposalId: string, vote: 'for' | 'against') => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }
    setVotedProposals(prev => new Set([...prev, proposalId]))
    console.log(`Voted ${vote} on proposal ${proposalId}`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vendor':
        return <Users className="w-4 h-4" />
      case 'tag':
        return <Vote className="w-4 h-4" />
      case 'treasury':
        return <DollarSign className="w-4 h-4" />
      default:
        return null
    }
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
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">DAO Governance</h2>
            <p className="text-gray-600">Participate in community decisions and shape the future of FoodChain</p>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-white/20 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'proposals', label: 'Active Proposals' },
                { id: 'create', label: 'Create Proposal' }
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
          
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'proposals' && (
              <div className="space-y-4">
                {proposals.map(proposal => {
                  const totalVotes = proposal.votes.for + proposal.votes.against
                  const forPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0
                  const hasVoted = votedProposals.has(proposal.id)
                  
                  return (
                    <div key={proposal.id} className="glass-card p-6 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getTypeIcon(proposal.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">{proposal.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{proposal.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(proposal.status)}
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            proposal.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            proposal.status === 'passed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {proposal.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Voting Progress</span>
                          <span>Ends: {proposal.endDate}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${forPercentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">
                            For: {proposal.votes.for} ({forPercentage.toFixed(1)}%)
                          </span>
                          <span className="text-red-600 font-medium">
                            Against: {proposal.votes.against} ({(100 - forPercentage).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      
                      {proposal.status === 'active' && !hasVoted && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleVote(proposal.id, 'for')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Vote For
                          </button>
                          <button
                            onClick={() => handleVote(proposal.id, 'against')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Vote Against
                          </button>
                        </div>
                      )}
                      
                      {hasVoted && (
                        <div className="text-center py-2 text-green-600 font-medium">
                          ✓ Vote Recorded
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            
            {activeTab === 'create' && (
              <div className="space-y-6">
                {!isAuthenticated ? (
                  <div className="text-center py-8">
                    <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication Required</h3>
                    <p className="text-gray-600 mb-4">You need to connect your wallet to create proposals</p>
                    <button
                      onClick={onLoginRequired}
                      className="glass-button px-6 py-2 rounded-lg"
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proposal Type
                      </label>
                      <select className="w-full px-3 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50">
                        <option value="vendor">Vendor Approval</option>
                        <option value="tag">Product Tag</option>
                        <option value="treasury">Treasury Allocation</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter proposal title..."
                        className="w-full px-3 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Provide detailed description of your proposal..."
                        className="w-full px-3 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Voting Duration (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        defaultValue="7"
                        className="w-full px-3 py-2 bg-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full glass-button py-3 rounded-lg font-medium"
                    >
                      Submit Proposal
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DAOModal
