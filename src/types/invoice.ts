export interface Invoice {
  invoiceType: 'daily' | 'weekly' | 'monthly';
  id: string;
  date: string;
  voucherNumber: string;
  clientId: string;
  clientName: string;
  bucketRate: number;
  breakerRate: number;
  bucketStartMeter: number;
  bucketStopMeter: number;
  breakerStartMeter: number;
  breakerStopMeter: number;
  bata: number;
  dieselAdvance: number;
  cashAdvance: number;
  oldBalance: number;
  oldAdBalance: number;
  totalBucketHours: number;
  totalBreakerHours: number;
  totalBucketAmount: number;
  totalBreakerAmount: number;
  totalAmount: number;
  totalBalance: number;
  status: 'paid' | 'pending';
  pdfUrl?: string;
}
