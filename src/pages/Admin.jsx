import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [robux, setRobux] = useState('');
  const [price, setPrice] = useState('');
  const [accounts, setAccounts] = useState([]);

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  // Fetch existing accounts from Firestore
  useEffect(() => {
    if (!access) return;
    const fetchAccounts = async () => {
      const querySnapshot = await getDocs(collection(db, "accounts"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(list);
    };
    fetchAccounts();
  }, [access]);

  // Add new account
  const addAccount = async () => {
    if (!title || !robux || !price) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "accounts"), {
        title,
        robux: Number(robux),
        price: Number(price),
        image: "" // You can extend later to add images
      });
      alert("Account added!");
      setTitle(''); setRobux(''); setPrice('');
      // Refresh list
      const querySnapshot = await getDocs(collection(db, "accounts"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccounts(list);
    } catch (e) {
      alert("Error adding account: " + e.message);
    }
  };

  if (!access) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={checkLogin} className="mt-2 px-4 py-2 bg-gray-800 text-white rounded">Login</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Roblox Account</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Robux"
        value={robux}
        onChange={e => setRobux(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button onClick={addAccount} className="px-4 py-2 bg-green-600 text-white rounded mb-4">Add Account</button>

      <h3 className="text-lg font-semibold mb-2">Current Accounts</h3>
      <ul>
        {accounts.map(acc => (
          <li key={acc.id} className="mb-1 border p-2 rounded">
            {acc.title} - {acc.robux} Robux - ${acc.price}
          </li>
        ))}
      </ul>
    </div>
  );
          }
