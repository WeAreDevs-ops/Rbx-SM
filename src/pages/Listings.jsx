import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      const querySnapshot = await getDocs(collection(db, 'accounts'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(data);
    };

    loadAccounts();
  }, []);

  const getUserIdFromProfile = (url) => {
    const match = url.match(/users\/(\d+)\//);
    return match ? match[1] : null;
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {accounts.map(account => {
        const userId = getUserIdFromProfile(account.profile);
        const avatar = userId
          ? `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`
          : 'https://tr.rbxcdn.com/58631b8f7dfb99a6f6f3f88e37bdbaba/150/150/AvatarHeadshot/Png';

        return (
          <div key={account.id} className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{account.title}</h3>
            <p className="text-sm text-gray-600">{account.robux} Robux</p>
            <p className="text-green-600 font-bold">${account.price}</p>
          </div>
        );
      })}
    </div>
  );
}
