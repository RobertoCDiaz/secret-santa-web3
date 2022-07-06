export default async function handler(req, res) {
    const eventId: string = (Math.random() + 1).toString(36).substring(2);
    const participants: string[] = JSON.parse(req.body).participants;
    const date: number = Math.floor(JSON.parse(req.body).date / 1000);

    console.log(participants)

    // shuffle participants list
    const shuffled: string[] = [];
    while (participants.length >= 1) {
        const randomIdx = Math.floor((Math.random() * participants.length - 1) + 1);

        shuffled.push(participants[randomIdx]);
        participants.splice(randomIdx, 1)[0];
    }

    res.status(200).json({
        eventId: eventId,
        list: shuffled,
        date: date,
    });
}