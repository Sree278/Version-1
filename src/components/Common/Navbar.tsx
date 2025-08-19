import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const { role, user } = useUserStore();
  return (
    <nav className={`shadow p-4 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-indigo-600'}`}>
      <div className="font-bold text-xl">Earth Mover SaaS</div>
      <div className="space-x-4">
        {role === 'superadmin' && (
          <>
            <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
            <Link to="/analytics" className="hover:text-indigo-400">Analytics</Link>
            <Link to="/user-management" className="hover:text-indigo-400">User Management</Link>
          </>
        )}
        {(role === 'businessadmin' || (!role && user)) && (
          <>
            <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
            <Link to="/invoices" className="hover:text-indigo-400">Invoices</Link>
            <Link to="/create-invoice" className="hover:text-indigo-400">Create Invoice</Link>
            <Link to="/upload-payment" className="hover:text-indigo-400">UPI Payment</Link>
            <Link to="/pricing" className="hover:text-indigo-400">Pricing</Link>
          </>
        )}
        {(role === 'superadmin' || role === 'businessadmin') && (
          <Link to="/" className="hover:text-indigo-400">Logout</Link>
        )}
        {!role && !user && (
          <span className="text-gray-400">Welcome</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded font-semibold border ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-indigo-100 text-indigo-700 border-indigo-200'}`}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {(role === 'superadmin' || role === 'businessadmin') && (
          <div className={`ml-4 px-3 py-1 rounded text-sm font-semibold ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
            {role === 'superadmin' ? 'Super Admin' : 'Business Admin'}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
