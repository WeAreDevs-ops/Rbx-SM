import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
        `<p style="font-size:16px; margin-bottom: 15px;">Choose where to contact me:</p>` +
        `<a href="https://discord.gg/AngyvYKe" target="_blank" rel="noopener noreferrer" style="color:#7289da; font-weight:700; font-size:18px; margin-right:25px; text-decoration:none; display:inline-flex; align-items:center;">` +
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7289da" viewBox="0 0 24 24"><path d="M20.317 4.3698A19.7913 19.7913 0 0016.016 3c-.211 0-.43.012-.643.036a13.618 13.618 0 00-6.778 0A19.7366 19.7366 0 006.682 3c-3.146 0-5.534.57-7.08 1.3698-1.035 1.535-1.714 3.603-1.832 6.283a19.9646 19.9646 0 000 5.594c.118 2.681.797 4.749 1.832 6.284A19.7885 19.7885 0 006.682 21c.208 0 .421-.011.63-.032a13.5951 13.5951 0 006.774 0c.212.021.43.032.646.032a19.7986 19.7986 0 004.301-1.3699c1.035-1.535 1.715-3.603 1.832-6.283a19.9646 19.9646 0 000-5.594c-.117-2.68-.797-4.748-1.83-6.283zm-11.54 9.772v-6.174l4.515 3.089-4.515 3.085z"/></svg>` +
          ` Discord</a>` +
        `<a href="https://www.facebook.com/mix.nthe.clubb" target="_blank" rel="noopener noreferrer" style="color:#1877f2; font-weight:700; font-size:18px; text-decoration:none; display:inline-flex; align-items:center;">` +
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1877f2" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.207c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562v1.878h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z"/></svg>` +
          ` Facebook</a>`,
      icon: 'info',
      showCloseButton: true,
      confirmButtonText: 'Close',
      customClass: {
        popup: 'rounded-xl',
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10">
      <h1 className="text-5xl text-yellow-400 font-extrabold text-center mb-16 tracking-wide drop-shadow-lg">
        Roblox Accounts Marketplace
      </h1>

      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {accounts.map(({ id, title, robux, price, profileLink }) => (
          <div
            key={id}
            className="bg-gray-850 bg-opacity-90 rounded-3xl shadow-2xl p-8 flex flex-col justify-between hover:shadow-yellow-400 hover:scale-105 transform transition-all duration-500"
          >
            <h2
              className="text-yellow-400 text-3xl font-semibold mb-5 truncate drop-shadow-md"
              title={title}
            >
              {title}
            </h2>

            <div className="mb-6 space-y-2 text-white font-medium text-lg">
              <p>Robux: <span className="font-extrabold">{robux.toLocaleString()}</span></p>
              <p>Price: <span className="font-extrabold">${price.toFixed(2)}</span></p>
            </div>

            <a
              href={profileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline font-semibold mb-8 hover:text-yellow-400 transition"
            >
              View Roblox Profile &rarr;
            </a>

            <button
              onClick={handleBuyClick}
              className="bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
