// ListingPage.jsx
import React from 'react';
import ListingCard from './ListingCard';

const listings = [
  { username: 'RobloxUser1', robloxLink: 'https://www.roblox.com/users/123456/profile', price: 50 },
  { username: 'RobloxUser2', robloxLink: 'https://www.roblox.com/users/789012/profile', price: 75 },
];

const ListingPage = () => (
  <div className="container py-8">
    <h1 className="text-3xl font-bold mb-6 text-gold">Available Roblox Accounts</h1>
    {listings.map((item, idx) => (
      <ListingCard
        key={idx}
        username={item.username}
        robloxLink={item.robloxLink}
        price={item.price}
      />
    ))}
  </div>
);

export default ListingPage;
