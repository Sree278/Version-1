import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleInput] = useState<'superadmin' | 'businessadmin'>('businessadmin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (!email || !password || password.length < 8) {
        setError('Please enter a valid email and password (min 8 chars).');
        setLoading(false);
        return;
      }
      toast.success(`Signup successful as ${role === 'superadmin' ? 'Super Admin' : 'Business Admin'}!`);
      setLoading(false);
      if (role === 'superadmin') {
        navigate('/analytics');
      } else {
        navigate('/invoices');
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {error && (
          <div className="mb-4 flex items-center justify-center text-red-500 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-4 flex items-center justify-center">
            <svg className="animate-spin w-4 h-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            <span className="text-indigo-600">Signing up...</span>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4 p-3 bg-indigo-50 rounded text-indigo-700 text-sm w-full">Create your account and select your role. <span title="Choose your role carefully">(?)</span>
          <div className="mt-2 text-xs text-gray-600">Super Admins have full system access. Business Admins manage invoices and payments.</div>
          <div className="mt-2 text-xs text-indigo-500">Need help signing up? <span title="Contact support for signup issues.">Contact support</span>.</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="input input-bordered w-full" aria-describedby="signupEmailTip" />
          <span id="signupEmailTip" className="text-xs text-gray-500">Use a valid business email address.</span>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="input input-bordered w-full" aria-describedby="signupPasswordTip" />
          <span id="signupPasswordTip" className="text-xs text-gray-500">Password must be at least 8 characters.</span>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
          <select value={role} onChange={e => setRoleInput(e.target.value as any)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-describedby="signupRoleTip">
            <option value="businessadmin">Business Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <span id="signupRoleTip" className="text-xs text-gray-500">Super Admins have full system access. Business Admins manage invoices and payments.</span>
        </div>
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
