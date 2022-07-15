/**
 * Shape of an email.
 */
 export interface EmailType {
    /**
     * Email recipient. I.e. Who will receive the email.
     */
    to: string,
    /**
     * Title of the email.
     */
    subject: string,
    /**
     * Email's content.
     */
    content: string,
}

/**
 * Participant struct.
 */
export interface Participant {
    /**
     * Full name of the participant.
     */
    name: string,

    /**
     * Email of the participant.
     */
    email: string,
}