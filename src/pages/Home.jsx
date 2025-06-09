import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">Welcome to RBX Market</h1>
      <p className="mt-2 text-lg">Buy rare Roblox accounts directly with PayPal or contact on Discord.</p>
      <Link to="/listings">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full">View Listings</button>
      </Link>
    </div>
  );
}
