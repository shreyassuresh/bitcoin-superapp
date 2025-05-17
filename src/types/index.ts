export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Wallet {
  address: string;
  balance: number;
  chain: 'mainnet' | 'testnet' | 'sBTC' | 'thunder';
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  chain: string;
}

export interface BitName {
  name: string;
  address: string;
  expiryDate: number;
}

export interface UserProfile {
  bitNames: BitName[];
  wallets: Wallet[];
  completedTutorials: string[];
} 