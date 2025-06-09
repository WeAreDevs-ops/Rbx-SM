import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection, addDoc, getDocs, deleteDoc, doc
} from 'firebase/firestore';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    title: '',
    robux: '',
    price: '',
    profile: ''
  });

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const addAccount = async () => {
    const { title, robux, price, profile } = newAccount;
    if (!title || !robux || !price || !profile) {
      return alert('Please fill out all fields.');
    }

    await addDoc(collection(db, 'accounts'), {
      ...newAccount,
      robux: Number(robux),
      price: Number(price)
    });

    alert('✅ Account added!');
    setNewAccount({ title: '', robux: '', price: '', profile: '' });
    loadAccounts();
  };

  const loadAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, 'accounts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccounts(data);
  };

  const deleteAccount = async (id) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    await deleteDoc(doc(db, 'accounts', id));
    loadAccounts();
  };

  useEffect(() => {
    if (access) loadAccounts();
  }, [access]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!access ? (
        <>
          <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={checkLogin} className="mt-2 px-4 py-2 bg-gray-800 text-white rounded w-full">Login</button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Add New Roblox Account</h2>
          <input name="title" placeholder="Account Title" value={newAccount.title} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
          <input name="robux" placeholder="Robux Amount" value={newAccount.robux} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
          <input name="price" placeholder="Price ($)" value={newAccount.price} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
          <input name="profile" placeholder="Roblox Profile Link" value={newAccount.profile} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" />
          <button onClick={addAccount} className="bg-green-600 text-white px-4 py-2 rounded w-full mb-4">Add Account</button>

          <h3 className="text-xl font-semibold mb-2">Current Listings</h3>
          <ul className="space-y-2">
            {accounts.map(account => (
              <li key={account.id} className="border p-3 rounded flex justify-between items-center bg-white shadow">
                <span>{account.title} - {account.robux} Robux - ${account.price}</span>
                <button
                  onClick={() => deleteAccount(account.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
