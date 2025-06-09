// Admin.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [robux, setRobux] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "accounts"), {
        title,
        robux,
        price,
        image
      });
      alert('✅ Account added!');
      setTitle('');
      setRobux('');
      setPrice('');
      setImage('');
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="p-4">
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
          <button onClick={checkLogin} className="mt-2 px-4 py-2 bg-gray-800 text-white rounded">Login</button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Add New Account</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Robux"
            value={robux}
            onChange={e => setRobux(e.target.value)}
            className="border p-2 rounded w-full mb-2"
