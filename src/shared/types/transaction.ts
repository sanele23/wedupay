export type TransactionStatus = 'Sent to BYU' | 'Processed' | 'Pending Clearance';

export interface Transaction {
  id: string;
  studentId?: string;
  studentName?: string;
  date: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  paymentMethod: string;
  hash: string;
  batchId: string;
}
