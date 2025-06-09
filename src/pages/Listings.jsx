import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

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

  const handleBuy = () => {
    Swal.fire({
      title: 'Contact Seller',
      text: 'Choose your preferred platform to contact the seller:',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Discord',
      cancelButtonText: 'Facebook',
      confirmButtonColor: '#5865F2', // Discord blue
      cancelButtonColor: '#1877F2',  // Facebook blue
    }).then((result) => {
      if (result.isConfirmed) {
        window.open('https://discord.gg/AngyvYKe', '_blank');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.open('https://www.facebook.com/mix.nthe.clubb', '_blank');
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">Available Roblox Accounts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {accounts.map(account => (
          <div
            key={account.id}
            className="bg-white text-gray-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{account.title}</h2>
              <p className="mb-1"><strong>Robux:</strong> {account.robux}</p>
              <p className="mb-1"><strong>Price:</strong> ${account.price}</p>

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
            </div>

            <button
              onClick={handleBuy}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
