import { TeamMemberPayload } from "@/services/portfolioService";
import { create } from "zustand";

export interface DraftPortfolio {
  contestId: string;
  team: TeamMemberPayload[];
  captain?: string;
  viceCaptain?: string;
}

export interface JoinedContestSummary {
  contestId: string;
  portfolio?: Record<string, any> | null;
  transactionId?: string | null;
  message?: string;
  beforeBalance?: number;
  afterBalance?: number;
}

interface PortfolioState {
  draftPortfolio: DraftPortfolio | null;
  lastJoinedContest: JoinedContestSummary | null;
  setDraftPortfolio: (draft: DraftPortfolio) => void;
  updateDraftPortfolio: (updates: Partial<DraftPortfolio>) => void;
  clearDraftPortfolio: () => void;
  setLastJoinedContest: (summary: JoinedContestSummary) => void;
  clearLastJoinedContest: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  draftPortfolio: null,
  lastJoinedContest: null,
  setDraftPortfolio: (draft) => set({ draftPortfolio: draft }),
  updateDraftPortfolio: (updates) =>
    set((state) =>
      state.draftPortfolio
        ? { draftPortfolio: { ...state.draftPortfolio, ...updates } }
        : state
    ),
  clearDraftPortfolio: () => set({ draftPortfolio: null }),
  setLastJoinedContest: (summary) => set({ lastJoinedContest: summary }),
  clearLastJoinedContest: () => set({ lastJoinedContest: null }),
}));

export default usePortfolioStore;

