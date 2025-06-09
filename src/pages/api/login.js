export default async function handler(req, res) {
  console.log('Login API called'); // ✅ Confirm API hits
  console.log('Request method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  console.log('Received password:', password);
  console.log('Env ADMIN_PASSWORD:', ADMIN_PASSWORD);

  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not set in env' });
  }

  if (password === ADMIN_PASSWORD) {
    console.log('✅ Password match — login successful');
    return res.status(200).json({ success: true });
  } else {
    console.log('❌ Invalid password');
    return res.status(401).json({ error: 'Invalid password' });
  }
}
