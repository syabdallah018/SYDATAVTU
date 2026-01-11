
export type Network = 'MTN' | 'AIRTEL' | 'GLO';
export type Method = 'MANUAL' | 'AUTO';
export type PaymentMethod = 'FLUTTERWAVE' | 'TRANSFER';

export interface DataPlan {
  id: string;
  label: string;
  price: number;
}

export interface Order {
  id: string;
  network: Network;
  method: Method;
  plan: string;
  price: number;
  phoneNumber: string;
  paymentMethod: PaymentMethod;
  status: 'PENDING' | 'SENT';
  createdAt: number;
}

export interface SystemConfig {
  manualEnabled: boolean;
}
