export interface User {
  id: string;
  email: string;
  role: 'user' | 'superadmin';
  company?: string;
}
