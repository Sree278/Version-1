export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'standard' | 'premium';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
}
