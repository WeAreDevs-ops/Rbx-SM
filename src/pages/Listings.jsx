import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// SweetAlert2 CDN is required in index.html:
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

export default function Listings() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      const querySnapshot = await getDocs(collection(db, 'accounts'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(data);
    }
    fetchAccounts();
  }, []);

  const handleBuyClick = () => {
    window.Swal.fire({
      title: 'Contact Seller',
      html:
        `<div style="font-size:16px; margin-bottom:12px;">Choose where to contact me:</div>` +
        `<a href="https://discord.gg/AngyvYKe" target="_blank" rel="noopener noreferrer" style="color:#7289da; font-weight:600; display:inline-flex; align-items:center; gap:8px; margin-right:20px; text-decoration:none;">` +
          `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#7289da" viewBox="0 0 24 24"><path d="M20.317 4.3698A19.7913 19.7913 0 0016.016 3c-.211 0-.43.012-.643.036a13.618 13.618 0 00-6.778 0A19.7366 19.7366 0 006.682 3c-3.146 0-5.534.57-7.08 1.3698-1.035 1.535-1.714 3.603-1.832 6.283a19.9646 19.9646 0 000 5.594c.118 2.681.797 4.749 1.832 6.284A19.7885 19.7885 0 006.682 21c.208 0 .421-.011.63-.032a13.5951 13.5951 0 006.774 0c.212.021.43.032.646.032a19.7986 19.7986 0 004.301-1.3699c1.035-1.535 1.715-3.603 1.832-6.283a19.9646 19.9646 0 000-5.594c-.117-2.68-.797-4.748-1.83-6.283zm-11.54 9.772v-6.174l4.515 3.089-4.515 3.085z"/></svg>` +
          `Discord</a>` +
        `<a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" rel="noopener noreferrer" style="color:#1877f2; font-weight:600; display:inline-flex; align-items:center; gap:8px; text-decoration:none;">` +
          `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#1877f2" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.207c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z"/></svg>` +
          `Facebook</a>`,
      icon: 'info',
      showCloseButton: true,
      confirmButtonText: 'Close',
      customClass: {
        popup: 'rounded-xl',
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center text-white tracking-wide">
        Roblox Accounts Marketplace
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {accounts.map(({ id, title, robux, price, profileLink }) => (
          <div
            key={id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-[1.03] transform transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-yellow-400 mb-3 truncate" title={title}>
              {title}
            </h2>
            <p className="text-white text-lg mb-1">
              Robux: <span className="font-semibold">{robux.toLocaleString()}</span>
            </p>
            <p className="text-white text-lg mb-4">
              Price: <span className="font-semibold">${price.toFixed(2)}</span>
            </p>
            <a
              href={profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 text-blue-400 hover:underline truncate"
              title="Visit Roblox Profile"
            >
              View Profile &rarr;
            </a>
            <button
              onClick={handleBuyClick}
              className="bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
