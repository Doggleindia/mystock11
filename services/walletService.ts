import axiosInstance from './axiosInstance';

export interface WalletBalance {
  walletBalance?: number;
  winningsBalance?: number;
  wallet?: number;
  winnings?: number;
}

export interface DepositPayload {
  amount: number;
}

export interface DepositResponse {
  success: boolean;
  message: string;
  data: {
    transaction: {
      _id: string;
      amount: number;
      currency: string;
      txnType: string;
      purpose: string;
      beforeBalance: number;
      afterBalance: number;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
    user: {
      walletBalance: number;
    };
  };
}

export interface DebitPayload {
  amount: number;
  purpose?: string;
  meta?: {
    matchId?: string;
    contestId?: string;
    [key: string]: any;
  };
}

export interface DebitResponse {
  success: boolean;
  message: string;
  data: {
    transaction: {
      _id: string;
      amount: number;
      status: string;
      referenceId: string;
      beforeBalance: number;
      afterBalance: number;
      purpose: string;
    };
    walletBalance: number;
  };
}

export interface TransactionsParams {
  page?: number;
  limit?: number;
  status?: string;
  txnType?: string;
  purpose?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface TransactionDetailResponse {
  success: boolean;
  data: {
    _id: string;
    user?: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    amount: number;
    currency: string;
    txnType: string;
    purpose: string;
    status: string;
    beforeBalance?: number;
    afterBalance?: number;
    createdAt: string;
    updatedAt: string;
    meta?: Record<string, any>;
    [key: string]: any;
  };
}

export interface TransactionsListResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  pages: number;
  data: TransactionDetailResponse['data'][];
}

class WalletService {
  /**
   * Fetch wallet balance
   */
  async getBalance(): Promise<WalletBalance> {
    try {
      const response = await axiosInstance.get('/api/transactions/wallet/balance');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deposit amount to wallet
   */
  async deposit(payload: DepositPayload): Promise<DepositResponse> {
    try {
      const response = await axiosInstance.post('/api/transactions/wallet/deposit', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Debit amount from wallet (for contest join, etc.)
   */
  async debit(payload: DebitPayload): Promise<DebitResponse> {
    try {
      const response = await axiosInstance.post('/api/transactions/wallet/debit', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch transactions with filters
   */
  async getTransactions(params: TransactionsParams): Promise<TransactionsListResponse> {
    try {
      const response = await axiosInstance.get('/api/transactions/user', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch single transaction detail
   */
  async getTransactionDetail(transactionId: string): Promise<TransactionDetailResponse> {
    try {
      const response = await axiosInstance.get(`/api/transactions/user/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new WalletService();
