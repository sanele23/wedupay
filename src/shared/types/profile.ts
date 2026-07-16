export interface StudentProfile {
  name: string;
  id: string;
  program: string;
  status: string;
  balanceDue: number;
  node: string;
  avatarUrl: string;
}

export type UserRole = 'student' | 'merchant' | 'none';

export type PaymentMethod = 'mobile_money' | 'ecocash' | 'bank_transfer';
