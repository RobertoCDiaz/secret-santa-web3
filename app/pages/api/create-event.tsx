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
    const participants: string[] = JSON.parse(req.body).participants;
    const date: number = JSON.parse(req.body).date;

    if (participants.length < 4) {
        res.status(400).json({
            error: 'Must provide at least 4 participants',
        });
    }

    // shuffle participants list
    const shuffled: string[] = [];
    while (participants.length >= 1) {
        const randomIdx = Math.floor((Math.random() * participants.length - 1) + 1);

        shuffled.push(participants[randomIdx]);
        participants.splice(randomIdx, 1);
    }

    // TODO: Send an email to each participant informing on who they were assigned to

    res.status(200).json({
        eventId: eventId,
        list: shuffled,
        date: date,
    });
}