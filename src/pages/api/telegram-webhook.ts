
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';

// Initialize Firebase Admin SDK
let adminInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount)
      });
    }
    adminInitialized = true;
  } else {
      console.error("CRITICAL: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
  }
} catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
}

const TELEGRAM_API = `https://api.telegram.org/bot8599325477:AAGJdWfdT3xFbiSlt-AA-Z6mKhY40gNkmWk`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!adminInitialized) {
    // We can't process a callback without the admin SDK.
    // We won't send a response to Telegram to avoid showing an error.
    console.error('Callback received but Firebase Admin not initialized.');
    return res.status(500).json({ message: 'Server not configured.' });
  }

  const { callback_query } = req.body;
  if (!callback_query) {
    return res.status(200).send('OK'); // Not a callback, acknowledge and ignore.
  }

  const [action, pendingUserId] = callback_query.data.split('_');
  const messageId = callback_query.message.message_id;
  const chatId = callback_query.message.chat.id;

  const db = getFirestore();
  const auth = getAuth();

  try {
    const pendingUserRef = db.collection('pending_users').doc(pendingUserId);
    const doc = await pendingUserRef.get();

    if (!doc.exists) {
      await axios.post(`${TELEGRAM_API}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: 'This request is invalid or has already been processed.',
        reply_markup: {},
      });
      return res.status(404).json({ message: 'Pending user not found.' });
    }

    const userData = doc.data() as { email: string; password?: string };

    if (action === 'approve') {
      if (!userData.password) {
          throw new Error('Password not found for pending user.');
      }
      try {
        const userRecord = await auth.createUser({
          email: userData.email,
          password: userData.password,
        });
        await pendingUserRef.delete();
        await axios.post(`${TELEGRAM_API}/editMessageText`, {
          chat_id: chatId,
          message_id: messageId,
          text: `✅ User *${userData.email}* has been approved and created successfully.`,
          parse_mode: 'Markdown',
          reply_markup: {},
        });
      } catch (error: any) {
        await axios.post(`${TELEGRAM_API}/editMessageText`, {
          chat_id: chatId,
          message_id: messageId,
          text: `🔥 *Failed to create user:* ${error.message}`,
          parse_mode: 'Markdown',
          reply_markup: {},
        });
      }
    } else if (action === 'deny') {
      await pendingUserRef.delete();
      await axios.post(`${TELEGRAM_API}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: `❌ Request for *${userData.email}* has been denied and deleted.`,
        parse_mode: 'Markdown',
        reply_markup: {},
      });
    }
    
    res.status(200).json({ message: 'Callback handled.' });

  } catch (error: any) {
    console.error('[WEBHOOK_ERROR]', error);
    // Attempt to notify admin of the webhook failure itself
    try {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId, // Send error to the chat where the button was pressed
        text: `🚨 *Critical Webhook Error:* Failed to process request for doc ID ${pendingUserId}. Reason: ${error.message}`,
        parse_mode: 'Markdown',
      });
    } catch (telegramError) {
      console.error('[TELEGRAM_NOTIFICATION_ERROR]', telegramError);
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
