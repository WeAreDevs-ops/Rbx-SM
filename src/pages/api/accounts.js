import { db } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const accountsRef = collection(db, 'accounts');

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const snapshot = await getDocs(accountsRef);
      const accounts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(accounts);
    }

    if (req.method === 'POST') {
      const { username, age, emailStatus, negotiable, price, profileLink } = req.body;

      if (!username || !age || !emailStatus || !negotiable || !price || !profileLink) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      const docRef = await addDoc(accountsRef, {
        username,
        age,
        emailStatus,
        negotiable,
        price: Number(price),
        profileLink
      });

      return res.status(200).json({ success: true, id: docRef.id });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'Missing account ID' });

      await deleteDoc(doc(accountsRef, id));
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
        }
