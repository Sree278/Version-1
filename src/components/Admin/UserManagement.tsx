
import React, { useState } from 'react';
import { useUserStore } from '../../store/useUserStore';

interface UserManagementProps {
  theme?: 'light' | 'dark';
}

const UserManagement: React.FC<UserManagementProps> = ({ theme = 'light' }) => {
  const { users, updateUserStatus } = useUserStore();
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => u.role === 'businessadmin' && u.email.includes(search));

  const handleStatusToggle = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      updateUserStatus(id, user.status === 'active' ? 'inactive' : 'active');
    }
  };

  return (
    <div className={`max-w-3xl mx-auto mt-8 ${theme === 'dark' ? 'text-white' : ''}`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : ''}`}>User Management</h2>
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={`input input-bordered w-full mb-4 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : ''}`}
      />
      <table className={`table-auto w-full rounded shadow ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <thead>
          <tr className={theme === 'dark' ? 'text-gray-300' : ''}>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className={`text-center py-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No users found.</td>
            </tr>
          ) : (
            filtered.map(u => (
              <tr key={u.id} className={theme === 'dark' ? 'border-b border-gray-800' : ''}>
                <td className={theme === 'dark' ? 'text-white' : ''}>{u.email}</td>
                <td className={theme === 'dark' ? 'text-white' : ''}>{u.role}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'active' ? (theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800')}`}>{u.status}</span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${u.status === 'active' ? (theme === 'dark' ? 'bg-red-700 text-white' : 'btn-error') : (theme === 'dark' ? 'bg-green-700 text-white' : 'btn-success')}`}
                    onClick={() => handleStatusToggle(u.id)}
                  >{u.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
