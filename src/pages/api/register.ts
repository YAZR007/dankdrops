
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TELEGRAM_API = `https://api.telegram.org/bot8599325477:AAGJdWfdT3xFbiSlt-AA-Z6mKhY40gNkmWk`;
const CHAT_ID = '8735516423';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const message = `New user registration attempt:\n\nEmail: ${email}`;

      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
      });

      res.status(200).json({ message: 'Registration attempt has been logged.' });
    } catch (error: any) {
      console.error('Error sending Telegram message:', error);
      const errorMessage = error.response?.data?.description || error.message || 'An unknown error occurred.';
      res.status(500).json({ message: `Failed to send Telegram notification: ${errorMessage}` });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
