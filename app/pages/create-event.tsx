import Head from "next/head";
import { Breakpoint, BreakpointProvider } from "react-socks";
import styles from "../styles/CreateEvent.module.scss";

import { ResponsiveFooter } from "../components/ResponsiveFooter";
import { AppButton } from "../components/AppButton";
import DateTimePicker from "../components/DateTimePicker";
import { MutableRefObject, useRef } from "react";
import ParticipantsList from "../components/ParticipantsList";

export default function CreateEvent() {
    /**
     * DateTimePicker element reference.
     */
    const dateTimePicker: MutableRefObject<DateTimePicker> = useRef();
    /**
     * ParticipantsList element reference.
     */
    const participantsList: MutableRefObject<ParticipantsList> = useRef();

    const createEvent = () => {
        // ...
    }

    return (
        <BreakpointProvider>
            <Head>
                <title>Create a new Secret Santa event</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            <div className={styles.app}>
                <Breakpoint className={styles.content} medium down>
                    <div className={styles.header}>
                        <i className="material-icons">
                            arrow_back_ios
                        </i>
                        <h1>Create event</h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.section}>
                            <p>Select a time and date for the exchange</p>
                            <DateTimePicker ref={dateTimePicker} />
                        </div>
                        <div className={styles.section}>
                            <p>Add participants to the exchange</p>
                            <ParticipantsList ref={participantsList}/>
                        </div>
                        <div className={styles.section}>
                            <p>When you're done, click the following button</p>
                            <AppButton text="CREATE SECRET SANTA" onClick={createEvent}/>
                        </div>
                    </div>
                </Breakpoint>
                <ResponsiveFooter />
            </div>
        </BreakpointProvider>
    );
}