import React from 'react';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Rbx Market</h1>
      <p>
        Discover and buy premium Roblox accounts securely and easily. Browse our extensive listings, connect with trusted sellers, and find your perfect account today.
      </p>
      <button onClick={() => window.location.href = '/listings'}>
        Browse Listings
      </button>
    </div>
  );
}
