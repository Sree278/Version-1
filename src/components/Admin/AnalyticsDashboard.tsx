import React from 'react';
import { useInvoiceStore } from '../../store/useInvoiceStore';

// Dummy chart component for demo (replace with chart library for production)
const BarChart = ({ data, label }: { data: number[]; label: string }) => (
  <div className="w-full h-32 bg-gray-100 rounded flex items-end p-2">
    {data.map((val, idx) => (
      <div key={idx} className="flex-1 mx-1 flex flex-col items-center">
        <div style={{ height: `${val * 2}px` }} className="w-6 bg-indigo-400 rounded-t"></div>
        <span className="text-xs mt-1">{val}</span>
      </div>
    ))}
    <span className="absolute left-2 top-2 text-xs text-gray-500">{label}</span>
  </div>
);

const AnalyticsDashboard: React.FC = () => {
  const { invoices } = useInvoiceStore();
  // Example analytics: invoices per day (simulate with random data)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const invoicesPerDay = days.map(() => Math.floor(Math.random() * 10));
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const pendingCount = invoices.filter(inv => inv.status === 'pending').length;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <h3 className="font-semibold mb-2">Invoices Per Day</h3>
          <BarChart data={invoicesPerDay} label="Invoices" />
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <h3 className="font-semibold mb-2">Payment Status</h3>
          <div className="flex space-x-6 mt-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-green-600">{paidCount}</span>
              <span className="text-xs text-gray-500">Paid</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-yellow-600">{pendingCount}</span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
          </div>
        </div>
      </div>
      {/* Add more analytics as needed */}
    </div>
  );
};

export default AnalyticsDashboard;
