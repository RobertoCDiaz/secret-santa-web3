import Head from "next/head";
import styles from "../styles/CreateEvent.module.scss";

import { ResponsiveFooter } from "../components/ResponsiveFooter";
import { AppButton } from "../components/AppButton";
import DateTimePicker from "../components/DateTimePicker";
import { MutableRefObject, useRef } from "react";
import ParticipantsList from "../components/ParticipantsList";
import Link from "next/link";

export default function CreateEvent() {
    // TODO: web3 validation
    /**
     * DateTimePicker element reference.
     */
    const dateTimePicker: MutableRefObject<DateTimePicker> = useRef();
    /**
     * ParticipantsList element reference.
     */
    const participantsList: MutableRefObject<ParticipantsList> = useRef();

    const createEvent = () => {
        // TODO: send information of an event to the backend for further processing
    }

    return (
        <div>
            <Head>
                <title>Create a new Secret Santa event</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            <div className={styles.app}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <Link href="/">
                            <i className="material-icons">
                                arrow_back_ios
                            </i>
                        </Link>
                        <h1>Create event</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <p>Select a time and date for the exchange</p>
                                <DateTimePicker className={`${styles.noFlex} ${styles.blackText}`} ref={dateTimePicker} />
                            </div>
                            <div className={styles.section}>
                                <p>Add participants to the exchange</p>
                                <ParticipantsList ref={participantsList}/>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <p>When you're done, click the following button</p>
                                <AppButton text="CREATE SECRET SANTA" onClick={createEvent}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.noFlex}>
                    <ResponsiveFooter />
                </div>
            </div>
        </div>
    );
}