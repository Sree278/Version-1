import { create } from 'zustand';
import { Invoice } from '../types/invoice';

interface InvoiceState {
  invoices: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  setInvoices: (invoices) => set({ invoices }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
