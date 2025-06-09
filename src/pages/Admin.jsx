import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    title: '',
    robux: '',
    price: '',
    profileLink: ''
  });

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const loadAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, 'accounts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccounts(data);
  };

  const addAccount = async () => {
    if (!newAccount.title || !newAccount.robux || !newAccount.price || !newAccount.profileLink) {
      return alert('Please fill out all fields.');
    }

    await addDoc(collection(db, 'accounts'), {
      ...newAccount,
      robux: Number(newAccount.robux),
      price: Number(newAccount.price)
    });

    alert('✅ Account added!');
    setNewAccount({ title: '', robux: '', price: '', profileLink: '' });
    loadAccounts();
  };

  const deleteAccount = async (id) => {
    if(window.confirm('Are you sure you want to delete this account?')) {
      await deleteDoc(doc(db, 'accounts', id));
      alert('✅ Account deleted!');
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
          <h2 className="text-xl font-bold mb-4">Admin Panel Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <button onClick={checkLogin} className="bg-gray-800 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Add New Roblox Account</h2>
          <input
            name="title"
            placeholder="Account Title"
            value={newAccount.title}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="robux"
            placeholder="Robux Amount"
            value={newAccount.robux}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="price"
            placeholder="Price ($)"
            value={newAccount.price}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="profileLink"
            placeholder="Roblox Profile Link"
            value={newAccount.profileLink}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={addAccount}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mb-6"
          >
            Add Account
          </button>

          <h3 className="text-xl font-semibold mb-2">Current Accounts</h3>
          <ul>
            {accounts.map(account => (
              <li
                key={account.id}
                className="border p-3 rounded mb-3 flex justify-between items-center bg-gray-800"
              >
                <div>
                  <strong>{account.title}</strong> — {account.robux} Robux — ${account.price}
                </div>
                <button
                  onClick={() => deleteAccount(account.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
