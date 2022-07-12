import { SMTPClient } from 'emailjs';

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export interface EmailType {
    to: string,
    subject: string,
    content: string,
}

export async function sendEmail(email: EmailType) {
    const client = new SMTPClient({
        user: EMAIL_ADDRESS,
        password: EMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    await client.sendAsync({
        from: EMAIL_ADDRESS,
        to: email.to,
        subject: email.subject,
        text: email.content,
    });
}