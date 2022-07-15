import { EmailType } from './types';
import { SMTPClient } from 'emailjs';

const EMAIL_ADDRESS: string = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const EMAIL_PASSWORD: string = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

/**
 * Using the `emailjs` dependency, sends an email with the credentials specified inside the `.env.local` file.
 * 
 * @param email - Email to be sent.
 */
export async function sendEmail(email: EmailType) {
    const client = new SMTPClient({
        user: EMAIL_ADDRESS,
        password: EMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    try {
        await client.sendAsync({
            from: EMAIL_ADDRESS,
            to: email.to,
            subject: email.subject,
            text: email.content,
        });
    } catch (err) {
        console.error(err);
    }
}