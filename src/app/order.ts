 import { CartItem } from './services/cart.service';

export type PaymentMethod = 'card' | 'blik' | 'transfer';

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface OrderRequest {
  customer: Customer;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
}

export interface Order extends OrderRequest {
  id: number;
  createdAt: Date;
}

export interface OrderError {
  message: string;
  fatal: boolean; // true = przekierowanie na stronę błędu
}