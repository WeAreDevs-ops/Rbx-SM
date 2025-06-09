export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  // Change your admin password here
  const ADMIN_PASSWORD = 'Gooners';

  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid password' });
  }
}
