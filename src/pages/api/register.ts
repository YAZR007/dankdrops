
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';

// Initialize Firebase Admin SDK
let db;
let adminInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount)
      });
    }
    db = getFirestore();
    adminInitialized = true;
  } else {
      console.error("CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
  }
} catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
}

const TELEGRAM_API = `https://api.telegram.org/bot8599325477:AAGJdWfdT3xFbiSlt-AA-Z6mKhY40gNkmWk`;
const CHAT_ID = '8735516423';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!adminInitialized) {
      return res.status(500).json({ message: 'Server configuration error: Firebase Admin not initialized. Please check server logs.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Store user in pending_users collection
    const pendingUserRef = await db.collection('pending_users').add({
      email,
      password, // Storing plain password temporarily. Will be deleted after approval/denial.
      createdAt: new Date(),
    });

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'N/A';
    const time = new Date().toUTCString();

    const message = `
📬 *New Sign-Up Request* 📬

*Email:* ${email}
*IP Address:* ${ip}
*Time:* ${time}

Please review and take action.
    `;

    // Send notification to Telegram
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Approve', callback_data: `approve_${pendingUserRef.id}` },
            { text: '❌ Deny', callback_data: `deny_${pendingUserRef.id}` },
          ],
        ],
      },
    });

    res.status(200).json({ message: 'Your registration is pending review.' });

  } catch (error: any) {
    console.error('[REGISTER_API_ERROR]', error);
    const errorMessage = axios.isAxiosError(error) ? error.response?.data?.description : error.message;
    res.status(500).json({ message: `An error occurred: ${errorMessage}` });
  }
}
