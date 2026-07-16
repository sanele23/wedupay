import { StudentProfile, Transaction } from './types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Tinashe Moyo',
  id: '29-4822-1',
  program: 'Applied Tech',
  status: 'Active Scholar',
  balanceDue: 345.00,
  node: 'Harare, Zimbabwe',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0hVcF9ib9HLB5sKkLghcMSt7qIFrYp6678H7XTBjaUIXTRPen-NAD1gmVGYWteIk1vWpKT2H-lwH3L5E9yvfVYGQx2tCM92XtiruxqnAAnL2gyr6yLCpf6S-DA4ndTyYFwI0PM670Y0bhKZ_lW-fNc6-JGlZ3-U4vaZeO1g0Kxb9bvWhXTio-wrEXnzu2X3okx45l3fvsQy2v-X_58GcPNWWQk7G1tlSstGtDqkrNX4H_FFuSRcmGi5eo5o-YHDPmy7mvPwLnsa1s'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-908A',
    date: 'Oct 12, 2024',
    description: 'BYU-Pathway Tuition - Fall Term',
    amount: 125.00,
    status: 'Sent to BYU',
    paymentMethod: 'EcoCash',
    hash: '0x82f3c7e4a1b2d3e4f5a1',
    batchId: 'ZW-2024-09'
  },
  {
    id: 'TXN-712F',
    date: 'Oct 05, 2024',
    description: 'Late Registration Fee',
    amount: 20.00,
    status: 'Processed',
    paymentMethod: 'Mobile Money',
    hash: '0x49e2b1c8f3a5e1d4b6a9',
    batchId: 'ZW-2024-08'
  },
  {
    id: 'TXN-411C',
    date: 'Sep 28, 2024',
    description: 'Installment Payment #1',
    amount: 200.00,
    status: 'Pending Clearance',
    paymentMethod: 'Bank Transfer',
    hash: '0x91a2d5f7b4c3e8a1d5c2',
    batchId: 'ZW-2024-07'
  }
];

export const EXCHANGE_RATE_ZWL_USD = 333.33;
