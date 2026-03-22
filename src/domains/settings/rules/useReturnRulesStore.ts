'use client';

import { create } from 'zustand';

export interface ReturnRule {
  returnWindowDays: number;
  autoApproveEnabled: boolean;
  autoApproveMaxValue: number;
  restockingFeePercent: number;
  requirePhotos: boolean;
  exchangeOnlyMode: boolean;
  eligibleCategories: string[];
  excludedSkus: string[];
  maxReturnsPerCustomer: number;
  freeReturnShipping: boolean;
}

interface ReturnRulesState {
  rules: ReturnRule;
  isDirty: boolean;
  updateRule: <K extends keyof ReturnRule>(key: K, value: ReturnRule[K]) => void;
  resetRules: () => void;
  saveRules: () => void;
}

const DEFAULT_RULES: ReturnRule = {
  returnWindowDays: 30,
  autoApproveEnabled: false,
  autoApproveMaxValue: 100,
  restockingFeePercent: 15,
  requirePhotos: true,
  exchangeOnlyMode: false,
  eligibleCategories: ['Apparel', 'Electronics', 'Accessories', 'Home'],
  excludedSkus: [],
  maxReturnsPerCustomer: 5,
  freeReturnShipping: true,
};

export const useReturnRulesStore = create<ReturnRulesState>((set) => ({
  rules: { ...DEFAULT_RULES },
  isDirty: false,
  updateRule: (key, value) =>
    set((state) => ({
      rules: { ...state.rules, [key]: value },
      isDirty: true,
    })),
  resetRules: () => set({ rules: { ...DEFAULT_RULES }, isDirty: false }),
  saveRules: () => set({ isDirty: false }),
}));
