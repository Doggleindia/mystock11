import axiosInstance from "./axiosInstance";

export interface TeamMemberPayload {
  stockSymbol: string;
  companyName: string;
  sector: string;
  buyPrice: number;
  quantity: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export interface ContestPortfolioPayload {
  team: TeamMemberPayload[];
  captain: string;
  viceCaptain: string;
}

export interface CreatePortfolioResponse {
  status?: string;
  message?: string;
  data?: {
    _id?: string;
    portfolioId?: string;
    contest?: string;
    [key: string]: unknown;
  };
}

export interface ContestJoinResponse {
  status?: string;
  message?: string;
  data?: unknown;
}

export interface CreateAndJoinResponse {
  status?: string;
  message?: string;
  data?: {
    portfolio?: {
      _id?: string;
      [key: string]: unknown;
    };
    contest?: string;
    transaction?: string;
  };
}

export const createContestPortfolio = async (
  contestId: string,
  payload: ContestPortfolioPayload
) => {
  const endpoint = `/api/portfolios/contests/${contestId}`;
  const response = await axiosInstance.post(endpoint, payload);
  return response.data as CreatePortfolioResponse;
};

export const joinContestWithPortfolio = async (
  contestId: string,
  portfolioId: string
) => {
  const endpoint = `/api/contests/${contestId}/join`;
  const response = await axiosInstance.post(endpoint, { portfolioId });
  return response.data as ContestJoinResponse;
};

export const createPortfolioAndJoinContest = async (
  contestId: string,
  payload: ContestPortfolioPayload
) => {
  const endpoint = `/api/portfolios/contests/${contestId}/join`;
  const response = await axiosInstance.post(endpoint, payload);
  return response.data as CreateAndJoinResponse;
};

export interface ContestSummary {
  _id: string;
  name?: string;
  entryFee?: number;
  totalSpots?: number;
  pricePool?: number;
  prizeDistribution?: Array<{ prizeAmount?: number }>;
  category?: string;
  maxEntriesPerUser?: number;
}

export interface PortfolioRecord {
  _id: string;
  contest?: ContestSummary | string;
  pnl?: number;
  pnlPercentage?: number;
  initialBalance?: number;
  currentBalance?: number;
  totalPoints?: number;
  createdAt?: string;
  [key: string]: unknown;
}

export interface MyPortfoliosResponse {
  status?: string;
  results?: number;
  data?: PortfolioRecord[];
}

export const fetchMyPortfolios = async () => {
  const response = await axiosInstance.get("/api/portfolios/my-portfolios");
  return response.data as MyPortfoliosResponse;
};

export interface PortfolioDetailResponse {
  status?: string;
  data?: {
    _id: string;
    user: {
      _id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    };
    contest: {
      _id: string;
      name: string;
      pricePool?: number;
      status: string;
      startTime: string;
      endTime: string;
    };
    team: Array<{
      stockSymbol: string;
      companyName: string;
      sector: string;
      buyPrice: number;
      currentPrice?: number;
      quantity: number;
      pnl?: number;
      pnlPercentage?: number;
      weight?: number;
      isCaptain?: boolean;
      isViceCaptain?: boolean;
      _id: string;
    }>;
    captain?: string;
    viceCaptain?: string;
    initialBalance?: number;
    currentBalance?: number;
    pnl?: number;
    pnlPercentage?: number;
    totalValue?: number;
    isLocked?: boolean;
    isFinalized?: boolean;
    isJoined?: boolean;
    totalPoints?: number;
    scoringDetails?: {
      captainMultiplier?: number;
      viceCaptainMultiplier?: number;
      baseScoringMetric?: string;
    };
  };
}

export const fetchPortfolioById = async (portfolioId: string) => {
  const response = await axiosInstance.get(`/api/portfolios/portfolio/${portfolioId}`);
  return response.data as PortfolioDetailResponse;
};


