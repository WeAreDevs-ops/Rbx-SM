import React, { useState } from 'react';

export default function Admin() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    if (password === 'rbxadmin') setAccess(true);
    else alert('Wrong password!');
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
        <p>✅ Admin access granted. You can now edit `accounts.json` manually on GitHub.</p>
      )}
    </div>
  );
}
