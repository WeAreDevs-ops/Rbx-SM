import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const snapshot = await getDocs(collection(db, 'accounts'));
      setAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchAccounts();
  }, []);

  const handleBuyClick = acc => {
    window.Swal.fire({
      title: 'Contact Seller',
      html:
        `<div style="text-align:left">` +
        `<p>Username: <strong>${acc.username}</strong></p>` +
        `<p>Age: ${acc.age}</p>` +
        `<p>Email Status: ${acc.emailStatus}</p>` +
        `<p>Negotiable: ${acc.negotiable}</p>` +
        `<p>Price: $${acc.price}</p>` +
        `<p><a href="${acc.profileLink}" target="_blank" style="color:#0af; text-decoration:underline">View Profile</a></p>` +
        `<hr style="margin:10px 0">` +
        `<p><em>Contact via:</em></p>` +
        `<a href="https://discord.gg/AngyvYKe" target="_blank" style="color:#7289da; margin-right:15px">Discord</a>` +
        `<a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" style="color:#1877f2">Facebook</a>` +
        `</div>`,
      icon: 'info',
      showCloseButton: true,
      confirmButtonText: 'OK',
      customClass: { popup: 'rounded-xl' }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl text-yellow-400 text-center font-bold mb-12">Roblox Marketplace</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map(acc => (
          <div
            key={acc.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-6 transform hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-semibold mb-3">{acc.username}</h2>
            <p>Age: {acc.age}</p>
            <p>Email: {acc.emailStatus}</p>
            <p>Negotiable: {acc.negotiable}</p>
            <p>Price: <strong>${acc.price}</strong></p>
            <p className="mt-2">
              <a href={acc.profileLink} target="_blank" className="text-blue-400 hover:underline">
                View Roblox Profile
              </a>
            </p>
            <button
              onClick={() => handleBuyClick(acc)}
              className="mt-4 bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
