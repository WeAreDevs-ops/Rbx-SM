// /api/accounts.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret123';

function authenticate(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  const user = authenticate(req, res);
  if (!user || user.role !== 'admin') return res.status(401).json({ error: 'Unauthorized' });

  // TODO: Replace with actual data (e.g., from Firebase)
  const accounts = [
    { id: 1, username: 'Batman', age: '13+', emailStatus: 'Verified', negotiable: 'Yes', price: 50, profile: 'https://roblox.com/users/123456789/profile' },
  ];

  return res.status(200).json(accounts);
}
