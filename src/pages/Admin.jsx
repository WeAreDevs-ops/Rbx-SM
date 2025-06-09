import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    username: '',
    age: '',
    emailStatus: '',
    negotiable: 'No',
    price: '',
    profileLink: ''
  });

  // ✅ Check admin password via API
  const checkLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAccess(true);
        loadAccounts();
      } else {
        alert(data.error || 'Wrong password!');
      }
    } catch (err) {
      alert('Server error while verifying password.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Fetch all accounts from backend
  const loadAccounts = async () => {
    const res = await fetch('/api/accounts');
    const data = await res.json();
    if (res.ok) setAccounts(data.accounts || []);
  };

  // ✅ Add new account via backend
  const addAccount = async () => {
    const { username, age, emailStatus, negotiable, price, profileLink } = newAccount;
    if (!username || !age || !emailStatus || !negotiable || !price || !profileLink) {
      return alert('Please fill out all fields.');
    }
    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        age,
        emailStatus,
        negotiable,
        price,
        profileLink
      }),
    });

    if (res.ok) {
      alert('✅ Account added!');
      setNewAccount({ username: '', age: '', emailStatus: '', negotiable: 'No', price: '', profileLink: '' });
      loadAccounts();
    } else {
      alert('Failed to add account.');
    }
  };

  // ✅ Delete account via backend
  const deleteAccount = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    const res = await fetch('/api/accounts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      loadAccounts();
    } else {
      alert('Failed to delete account.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!access ? (
        <>
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button onClick={checkLogin} className="bg-gray-800 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Add New Account</h2>

          {['username', 'age', 'emailStatus', 'price', 'profileLink'].map(field => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('Status', ' Status')}
              value={newAccount[field]}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
          ))}

          <select
            name="negotiable"
            value={newAccount.negotiable}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="No">Negotiable: No</option>
            <option value="Yes">Negotiable: Yes</option>
          </select>

          <button onClick={addAccount} className="bg-green-600 text-white px-4 py-2 rounded w-full mb-6">
            Add Account
          </button>

          <h3 className="text-xl font-semibold mb-2">Current Listings</h3>
          <ul>
            {accounts.map(acc => (
              <li
                key={acc.id}
                className="border p-3 rounded mb-3 flex justify-between bg-gray-800 text-white"
              >
                <div>
                  <strong>{acc.username}</strong> — {acc.age} — {acc.emailStatus} — 
                  Negotiable: {acc.negotiable} — ${acc.price} — <a href={acc.profileLink} className="underline" target="_blank">Profile</a>
                </div>
                <button
                  onClick={() => deleteAccount(acc.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
