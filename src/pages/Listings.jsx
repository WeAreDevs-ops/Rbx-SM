import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// SweetAlert2 CDN popup method since no npm install
// We'll call window.Swal from CDN, so add SweetAlert2 CDN script in your index.html:
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

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

  const handleBuyClick = () => {
    window.Swal.fire({
      title: 'Contact Seller',
      html:
        `<a href="https://discord.gg/AngyvYKe" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline mr-6">Discord</a>` +
        `<a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">Facebook</a>`,
      icon: 'info',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Close'
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Roblox Accounts Listings</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {accounts.map(account => (
          <div
            key={account.id}
            className="bg-gray-900 text-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{account.title}</h2>
            <p className="mb-1">Robux: <strong>{account.robux.toLocaleString()}</strong></p>
            <p className="mb-3">Price: <strong>${account.price.toFixed(2)}</strong></p>
            <a
              href={account.profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mb-4 block truncate"
              title="Visit Roblox Profile"
            >
              Visit Profile
            </a>
            <button
              onClick={handleBuyClick}
              className="bg-yellow-400 text-gray-900 font-semibold py-2 rounded hover:bg-yellow-500 transition"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
