import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs
} from 'firebase/firestore';

// ✅ Firebase Config (Use your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDCfx4m9yrc6CaEU83q_AbG_RG4agOvje4",
  authDomain: "rbx-sm-db.firebaseapp.com",
  projectId: "rbx-sm-db",
  storageBucket: "rbx-sm-db.appspot.com",
  messagingSenderId: "626499721050",
  appId: "1:626499721050:web:237fd4bf9cb9abd4228563",
  measurementId: "G-M878D082KB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    title: '',
    robux: '',
    price: '',
    image: ''
  });

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const addAccount = async () => {
    if (!newAccount.title || !newAccount.robux || !newAccount.price || !newAccount.image) {
      return alert('Please fill out all fields.');
    }

    await addDoc(collection(db, 'accounts'), {
      ...newAccount,
      robux: Number(newAccount.robux),
      price: Number(newAccount.price)
    });

    alert('✅ Account added!');
    setNewAccount({ title: '', robux: '', price: '', image: '' });
    loadAccounts();
  };

  const loadAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, 'accounts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccounts(data);
  };

  useEffect(() => {
    if (access) loadAccounts();
  }, [access]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!access ? (
        <>
          <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={checkLogin} className="mt-2 px-4 py-2 bg-gray-800 text-white rounded w-full">Login</button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Add New Roblox Account</h2>
          <input
            name="title"
            placeholder="Account Title"
            value={newAccount.title}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="robux"
            placeholder="Robux Amount"
            value={newAccount.robux}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="price"
            placeholder="Price ($)"
            value={newAccount.price}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={newAccount.image}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={addAccount} className="bg-green-600 text-white px-4 py-2 rounded w-full mb-4">Add Account</button>

          <h3 className="text-xl font-semibold">Current Accounts</h3>
          <ul className="mt-2">
            {accounts.map(account => (
              <li key={account.id} className="border p-2 rounded mb-2">
                {account.title} - {account.robux} Robux - ${account.price}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
