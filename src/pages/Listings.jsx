import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const querySnapshot = await getDocs(collection(db, "accounts"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="border p-4 rounded-lg">
            <img src={account.image} alt={account.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{account.title}</h3>
            <p>{account.robux} Robux | ${account.price}</p>
            <Link to={`/account/${account.id}`}>
              <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded">View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
