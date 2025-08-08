export interface Product {
  id: string
  name: string
  price: number
  image: string
  vendor: string
  tags: string[]
  origin: string
  certifications: string[]
  supplyChain: SupplyChainStep[]
  description: string
  rating: number
  reviews: number
}

export interface SupplyChainStep {
  id: string
  step: string
  location: string
  timestamp: string
  verified: boolean
  txHash?: string
}

export interface DAOProposal {
  id: string
  title: string
  description: string
  type: 'vendor' | 'tag' | 'treasury'
  votes: {
    for: number
    against: number
  }
  status: 'active' | 'passed' | 'rejected'
  endDate: string
}
