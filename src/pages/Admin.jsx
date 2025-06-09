import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
  };

  const loadAccounts = async () => {
    const snapshot = await getDocs(collection(db, 'accounts'));
    setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addAccount = async () => {
    const { username, age, emailStatus, negotiable, price, profileLink } = newAccount;
    if (!username || !age || !emailStatus || !negotiable || !price || !profileLink) {
      return alert('Please fill out all fields.');
    }
    await addDoc(collection(db, 'accounts'), {
      username,
      age,
      emailStatus,
      negotiable,
      price: Number(price),
      profileLink
    });
    alert('✅ Account added!');
    setNewAccount({ username: '', age: '', emailStatus: '', negotiable: 'No', price: '', profileLink: '' });
    loadAccounts();
  };

  const deleteAccount = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, 'accounts', id));
      loadAccounts();
    }
  };

  useEffect(() => {
    if (access) loadAccounts();
  }, [access]);

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

          {['username','age','emailStatus','price','profileLink'].map(field => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('Status',' Status')}
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
                  Negotiable: {acc.negotiable} — ${acc.price}
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
