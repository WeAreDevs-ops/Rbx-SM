export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Use env variable

  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Server misconfiguration: ADMIN_PASSWORD not set.' });
  }

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid password' });
  }
}
