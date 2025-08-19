import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useUserStore } from '../../store/useUserStore';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

interface LoginProps {
  theme?: 'light' | 'dark';
}

const Login: React.FC<LoginProps> = ({ theme = 'light' }) => {
  // Master Super Admin credentials from store
  const masterSuperAdminEmail = 'sreejithcu2020@gmail.com';
  const { setUser: setUserStore, setRole, users, superAdminPassword } = useUserStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleInput] = useState<'superadmin' | 'businessadmin'>('businessadmin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate async login
    setTimeout(() => {
      let valid = false;
      let user: typeof users[number] | undefined = undefined;
      if (role === 'superadmin') {
        valid = email === masterSuperAdminEmail && password === superAdminPassword;
      } else {
        user = users.find(u => u.email === email && u.role === 'businessadmin');
        valid = !!user && password === user.password;
      }
      if (!valid) {
        setError('Invalid credentials. Use demo credentials below.');
        setLoading(false);
        return;
      }
      if (role === 'businessadmin' && user && user.status === 'inactive') {
        setError('Your account is deactivated. Please contact Super Admin to reactivate.');
        setLoading(false);
        return;
      }
      setUserStore({ email });
      setRole(role);
      toast.success(`Login successful as ${role === 'superadmin' ? 'Super Admin' : 'Business Admin'}!`);
      setLoading(false);
      if (role === 'superadmin') {
        navigate('/analytics');
      } else {
        navigate('/invoices');
      }
    }, 1200);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="mb-6 flex flex-col items-center">
          <span className={`inline-block rounded-full p-3 mb-2 ${theme === 'dark' ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white'}`}> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z" /></svg>
          </span>
          <h2 className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sign in to your account</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-2 text-sm`}>Welcome back! Please enter your details.</p>
        </div>
  {/* Info box removed for cleaner UI */}
        <form onSubmit={handleLogin} className="w-full">
          {/* Demo credentials removed for cleaner UI */}
          {error && (
            <div className={`mb-4 flex items-center justify-center text-red-500 text-sm ${theme === 'dark' ? 'text-red-400' : ''}`}>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              {error}
            </div>
          )}
          {loading && (
            <div className="mb-4 flex items-center justify-center">
              <svg className={`animate-spin w-4 h-4 mr-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              <span className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}>Logging in...</span>
            </div>
          )}
          <div className="mb-4">
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-700' : 'focus:ring-indigo-400'}`} aria-describedby="emailTip" />
            <span id="emailTip" className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Use your registered email address.</span>
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-700' : 'focus:ring-indigo-400'}`} aria-describedby="passwordTip" />
            <span id="passwordTip" className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Password must be at least 8 characters.</span>
          </div>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Role</label>
            <select value={role} onChange={e => setRoleInput(e.target.value as any)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:ring-indigo-700' : 'focus:ring-indigo-400'}`} aria-describedby="roleTip">
              <option value="businessadmin">Business Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            <span id="roleTip" className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Super Admins have full system access. Business Admins manage invoices and payments.</span>
          </div>
          <button type="submit" className={`w-full py-2 px-4 font-bold rounded-lg shadow transition duration-150 ${theme === 'dark' ? 'bg-indigo-700 text-white hover:bg-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>Login</button>
        </form>
        <div className={`mt-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Don't have an account? <a href="/signup" className={theme === 'dark' ? 'text-indigo-400 hover:underline' : 'text-indigo-600 hover:underline'}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
