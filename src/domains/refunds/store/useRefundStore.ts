import { create } from 'zustand';
import { Refund } from '../types';

interface RefundState {
  refunds: Refund[];
  addRefund: (refund: Refund) => void;
  setRefunds: (refunds: Refund[]) => void;
}

export const useRefundStore = create<RefundState>((set) => ({
  refunds: [],
  addRefund: (refund) => set((state) => ({ refunds: [...state.refunds, refund] })),
  setRefunds: (refunds) => set({ refunds }),
}));
