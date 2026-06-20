
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
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
    console.error('Callback received but Firebase Admin not initialized.');
    return res.status(500).json({ message: 'Server not configured.' });
  }

  const { callback_query } = req.body;
  if (!callback_query) {
    return res.status(200).send('OK'); // Not a callback, acknowledge and ignore.
  }

  const [action, email] = callback_query.data.split('_');
  const messageId = callback_query.message.message_id;
  const chatId = callback_query.message.chat.id;
  const messageText = callback_query.message.text;

  // Extract password from the message text
  const passwordMatch = messageText.match(/\*Password:\* (.*)/);
  const password = passwordMatch ? passwordMatch[1] : null;

  const auth = getAuth();

  try {
    if (action === 'approve') {
      if (!password) {
          throw new Error('Password not found in the message.');
      }
      try {
        await auth.createUser({
          email: email,
          password: password,
        });
        await axios.post(`${TELEGRAM_API}/editMessageText`, {
          chat_id: chatId,
          message_id: messageId,
          text: `✅ User *${email}* has been approved and created successfully.`,
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
      await axios.post(`${TELEGRAM_API}/editMessageText`, {
        chat_id: chatId,
        message_id: messageId,
        text: `❌ Request for *${email}* has been denied.`,
        parse_mode: 'Markdown',
        reply_markup: {},
      });
    }
    
    res.status(200).json({ message: 'Callback handled.' });

  } catch (error: any) {
    console.error('[WEBHOOK_ERROR]', error);
    try {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `🚨 *Critical Webhook Error:* Failed to process request for ${email}. Reason: ${error.message}`,
        parse_mode: 'Markdown',
      });
    } catch (telegramError) {
      console.error('[TELEGRAM_NOTIFICATION_ERROR]', telegramError);
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
