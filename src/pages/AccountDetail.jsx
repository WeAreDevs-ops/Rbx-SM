import React from 'react';
import { useParams } from 'react-router-dom';
import accounts from '../data/accounts.json';

export default function AccountDetail() {
  const { id } = useParams();
  const account = accounts.find(a => a.id === id);

  if (!account) return <p>Account not found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{account.title}</h2>
      <img src={account.image} alt={account.title} className="w-full h-64 object-cover mt-2 rounded" />
      <p className="mt-2">{account.description}</p>
      <ul className="mt-2 list-disc list-inside">
        <li><strong>Robux:</strong> {account.robux}</li>
        <li><strong>Join Date:</strong> {account.joinDate}</li>
        <li><strong>Limiteds:</strong> {account.limiteds.join(', ')}</li>
        <li><strong>Price:</strong> ${account.price}</li>
      </ul>
      <a href={account.paymentLink} target="_blank" rel="noreferrer">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full">Buy Now</button>
      </a>
      <p className="mt-2">Or contact via Discord: <strong>RbxSeller689</strong></p>
    </div>
  );
}
