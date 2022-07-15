import { sendEmail } from "../../utils/email";
import { EmailType, Participant } from "../../utils/types";
import moment from 'moment';

export default function handler(req, res) {
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
    const participants: Participant[] = JSON.parse(req.body).participants;
    const date: number = JSON.parse(req.body).date;

    if (participants.length < 4) {
        res.status(400).json({
            error: 'Must provide at least 4 participants',
        });
    }

    const shuffled: Participant[] = shuffleList(participants);
    sendEmails(shuffled, eventId, date);

    res.status(200).json({
        eventId: eventId,
        list: shuffled,
        date: date,
    });
}

/**
 * Randomly shuffles a list of items.
 * 
 * @param list - List to be shuffled.
 * @returns Shuffled list.
 */
function shuffleList(list: Participant[], ): Participant[] {
    const shuffled: Participant[] = [];
    while (list.length >= 1) {
        const randomIdx = Math.floor((Math.random() * list.length - 1) + 1);

        shuffled.push(list[randomIdx]);
        list.splice(randomIdx, 1);
    }

    return shuffled;
}

/**
 * Sends an email to each participant informing them to who will they be giving a present to.
 * 
 * @param participants - List of participants of the event, already shuffled and sorted in giving order.
 * @param eventId - Unique identificator of the event in the blockchain.
 * @param date - Unix timestamp defining the date and time of the event start.
 */
function sendEmails(participants: Participant[], eventId: string, date: number) {
    // send emails to each participant
    participants.forEach((participant, idx) => {
        const nextParticipant = (idx < participants.length - 1) ? participants[idx + 1] : participants[0];

        const email: EmailType = {
            to: participant.email,
            subject: 'Secret Santa',
            content: `Hi, ${participant.name}!

You've been added to a new Secret Santa event!

This time, you were assigned to give a present to ${nextParticipant.name}. Remember to not reveal this to anyone! 🤫

The event was set to be on ${moment(date * 1000).format("MMMM Do, YYYY [at] HH:mm a")}. After that, you will be able to enter ${process.env.NEXT_PUBLIC_APP_URL}/exchange/${eventId} and follow the instructions there to start the exchange!

Have fun!`,
        };

        sendEmail(email);
    })
}