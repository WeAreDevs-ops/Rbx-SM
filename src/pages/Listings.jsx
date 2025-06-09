import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const accountsCollection = collection(db, 'accounts');
        const accountsSnapshot = await getDocs(accountsCollection);
        const accountsList = accountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccounts(accountsList);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    }

    fetchAccounts();
  }, []);

  if (accounts.length === 0) {
    return <p className="p-4 text-center text-gray-500">No accounts found.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Accounts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {accounts.map(account => (
          <div
            key={account.id}
            className="bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <img
              src={account.image}
              alt={account.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{account.title}</h3>
              <p className="text-gray-700">{account.robux} Robux</p>
              <p className="text-green-600 font-bold">${account.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
