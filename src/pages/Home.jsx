import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
        Welcome to Rbx Market
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your one-stop Roblox account marketplace.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Browse Listings
      </button>
    </div>
  );
}
