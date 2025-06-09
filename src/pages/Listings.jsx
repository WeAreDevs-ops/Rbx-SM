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
    return <p className="p-4 text-center">No accounts found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="border p-4 rounded-lg">
            <img src={account.image} alt={account.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{account.title}</h3>
            <p>{account.robux} Robux | ${account.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
