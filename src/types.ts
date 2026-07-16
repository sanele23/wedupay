export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Sent to BYU' | 'Processed' | 'Pending Clearance';
  paymentMethod: string;
  hash: string;
  batchId: string;
}

export type PaymentMethod = 'mobile_money' | 'ecocash' | 'bank_transfer';

export interface StudentProfile {
  name: string;
  id: string;
  program: string;
  status: string;
  balanceDue: number;
  node: string;
  avatarUrl: string;
}
