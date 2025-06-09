// /api/login.js
import jwt from 'jsonwebtoken';

const ADMIN_PASSWORD = 'rbxadmin';
const JWT_SECRET = 'secret123'; // Keep it secret!

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid password' });
}
