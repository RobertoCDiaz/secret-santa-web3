import { EmailType, sendEmail } from "../../utils/email";
import moment from 'moment';

export default async function handler(req, res) {
    if (req.method != 'POST') {
        res.status(400).json({
            error: 'This is a POST endpoint',
        });
    }

    if (req.body === '') {
        res.status(400).json({
            error: 'Date and participants parameters must be provided',
        });
    }

    const eventId: string = (Math.random() + 1).toString(36).substring(2);
    const participants: any[] = JSON.parse(req.body).participants;
    const date: number = JSON.parse(req.body).date;

    if (participants.length < 4) {
        res.status(400).json({
            error: 'Must provide at least 4 participants',
        });
    }

    // shuffle participants list
    const shuffled: any[] = [];
    while (participants.length >= 1) {
        const randomIdx = Math.floor((Math.random() * participants.length - 1) + 1);

        shuffled.push(participants[randomIdx]);
        participants.splice(randomIdx, 1);
    }

    shuffled.forEach((participant, idx) => {
        const nextParticipant = (idx < shuffled.length - 1) ? shuffled[idx + 1] : shuffled[0];

        const email: EmailType = {
            to: participant.email,
            subject: 'Secret Santa',
            content: `Hi, ${participant.name}!

You've been added to a new Secret Santa event!

This time, you were assigned to give a present to ${nextParticipant.name}. Remember to not reveal this to anyone! 🤫

The event was set to be on ${moment(date * 1000).format("MMMM Do, YYYY [at] HH:mm a")}. At that moment, you will be able to enter ${process.env.NEXT_PUBLIC_APP_URL}/exchange/${eventId} and follow the instructions there to start the exchange!

Have fun!`,
        };

        sendEmail(email);
    })

    res.status(200).json({
        eventId: eventId,
        list: shuffled,
        date: date,
    });
}