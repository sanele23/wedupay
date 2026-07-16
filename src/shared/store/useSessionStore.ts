import { create } from 'zustand';
import { INITIAL_STUDENT_PROFILE, INITIAL_TRANSACTIONS } from '@/lib/mock-data';
import { StudentProfile, Transaction, UserRole } from '@/shared/types';

/**
 * Phase 1 (UI only) session state. Holds the demo role/profile/transaction data
 * client-side so the multi-screen flow (auth -> dashboard/merchant -> success)
 * works without a backend. This store is replaced by real auth + persisted
 * data once the Next.js backend phase lands.
 */
interface SessionState {
  role: UserRole;
  profile: StudentProfile;
  transactions: Transaction[];
  prefilledAmountUSD?: number;
  lastPaymentAmount: number;
  lastPaymentMethod: string;

  setPrefilledAmountUSD: (amount?: number) => void;
  login: (role: UserRole, userDetails: { name: string; id: string }) => void;
  logout: () => void;
  authorizePayment: (amountPaid: number, method: string) => void;
  approveTransaction: (txnId: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  role: 'none',
  profile: INITIAL_STUDENT_PROFILE,
  transactions: INITIAL_TRANSACTIONS,
  prefilledAmountUSD: undefined,
  lastPaymentAmount: 120.0,
  lastPaymentMethod: 'EcoCash',

  setPrefilledAmountUSD: (amount) => set({ prefilledAmountUSD: amount }),

  login: (role, userDetails) =>
    set((state) => ({
      role,
      profile:
        role === 'student'
          ? { ...state.profile, name: userDetails.name, id: userDetails.id }
          : state.profile,
    })),

  logout: () =>
    set({
      role: 'none',
      prefilledAmountUSD: undefined,
    }),

  authorizePayment: (amountPaid, method) =>
    set((state) => {
      const newTxn: Transaction = {
        id: `TXN-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        studentId: state.profile.id,
        studentName: state.profile.name,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        description: 'BYU-Pathway Tuition - Term Settlement',
        amount: amountPaid,
        status: 'Pending Clearance',
        paymentMethod: method,
        hash: '0x' + Array.from({ length: 20 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        batchId: `ZW-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
      };

      return {
        transactions: [newTxn, ...state.transactions],
        profile: {
          ...state.profile,
          balanceDue: Math.max(0, state.profile.balanceDue - amountPaid),
        },
        prefilledAmountUSD: undefined,
        lastPaymentAmount: amountPaid,
        lastPaymentMethod: method,
      };
    }),

  approveTransaction: (txnId) =>
    set((state) => ({
      transactions: state.transactions.map((txn) =>
        txn.id === txnId ? { ...txn, status: 'Processed' } : txn
      ),
    })),
}));
