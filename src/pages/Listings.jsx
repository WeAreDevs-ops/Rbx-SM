import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const querySnapshot = await getDocs(collection(db, 'accounts'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(data);
    };

    fetchAccounts();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Roblox Accounts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white text-gray-800 rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{account.title}</h2>
            <p className="mb-1"><strong>Robux:</strong> {account.robux}</p>
            <p className="mb-1"><strong>Price:</strong> ${account.price}</p>
            
            {/* Profile Link */}
            {account.image && (
              <a
                href={account.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                View Roblox Profile
              </a>
            )}

            {/* Contact Buttons */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://discord.gg/AngyvYKe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                Contact via Discord
              </a>
              <a
                href="https://www.facebook.com/mix.nthe.clubb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Facebook
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
