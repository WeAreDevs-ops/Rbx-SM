import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  const loadAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, 'accounts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccounts(data);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Available Roblox Accounts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {accounts.map(account => (
          <div key={account.id} className="bg-white text-black rounded-xl shadow-lg overflow-hidden p-4">
            <iframe
              src={account.image}
              className="w-full h-48 rounded mb-4"
              allowFullScreen
            />
            <h2 className="text-xl font-semibold mb-1">{account.title}</h2>
            <p className="text-sm mb-1">💰 {account.robux} Robux</p>
            <p className="text-sm">💵 ${account.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
