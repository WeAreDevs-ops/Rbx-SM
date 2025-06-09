import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaDiscord, FaFacebookSquare } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">Roblox Accounts for Sale</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {accounts.map(account => (
          <div key={account.id} className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{account.title}</h2>
              <p className="text-md mb-1">💰 Robux: <span className="font-semibold">{account.robux}</span></p>
              <p className="text-md mb-3">💵 Price: <span className="font-semibold">${account.price}</span></p>
              <a
                href={account.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-3 transition"
              >
                View Roblox Profile
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://discord.gg/AngyvYKe" target="_blank" rel="noopener noreferrer">
                <FaDiscord className="text-3xl text-indigo-600 hover:text-indigo-800 transition" />
              </a>
              <a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare className="text-3xl text-blue-700 hover:text-blue-900 transition" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
