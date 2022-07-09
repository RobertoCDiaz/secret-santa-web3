import Head from "next/head";
import styles from "../styles/CreateEvent.module.scss";

import { ResponsiveFooter } from "../components/ResponsiveFooter";
import { AppButton } from "../components/AppButton";
import DateTimePicker from "../components/DateTimePicker";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ParticipantsList from "../components/ParticipantsList";
import Link from "next/link";
import Web3Modal from 'web3modal';
import { connectToWallet, newContractInstance, newWeb3ModalInstance } from '../utils/web3';
import InfoPopup, { InfoType } from "../components/InfoPopup";
import moment from "moment";

export default function CreateEvent() {
    /**
     * DateTimePicker element reference.
     */
    const dateTimePicker: MutableRefObject<DateTimePicker> = useRef();
    /**
     * ParticipantsList element reference.
     */
    const participantsList: MutableRefObject<ParticipantsList> = useRef();

    /**
     * Whether the app is currently connected to a wallet or not.
     */
    const [isConnected, setIsConnected] = useState<boolean>(false);

    /**
     * Object to be able to connect to a wallet.
     */
    const web3Modal: MutableRefObject<Web3Modal> = useRef();

    const [eventId, setEventId] = useState<string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Handles the click on the "Create Event" button. This will send the data provided by the user
     * to process on the backend. It will then came back to this page and will be send to the smart contract
     * to create a new event.
     */
    const handleCreateClick = () => {
        if (!isConnected) {
            alert("You can't create an event if you're not connected to an Ethereum Wallet. Please connect to the network and try again.")
            return;
        }
        
        if (!dateTimePicker.current.getDate().isAfter(moment())) {
            alert("Select a date after now");
            return;
        }

        if (participantsList.current.getList().length < 4) {
            alert("You need to add at least 4 participants");
            return;
        }

        // send data to backend for further processing
        fetch(`http://localhost:3000/api/create-event`, {
            method: 'POST',
            body: JSON.stringify({
                participants: participantsList.current.getList(),
                date: dateTimePicker.current.getDate().unix(),
            }),
        }).then(res => res.json()).then(res => {
            const { list, date, eventId } = res;

            createEvent(list.map(p => p.name), date, eventId);
        });
    }

    /**
     * Takes the information that came back from the backend, creates a new contract instance,
     * and calls it to make a new event.
     * 
     * @param list - List of participants, already sorted by giving order.
     * @param date - Timestamp of the date and time of the event.
     * @param eventId - ID of the event inside the smart contract.
     */
    const createEvent = async (list: string[], date: number, eventId: string) => {
        try {
            const contract = await newContractInstance(web3Modal, true);

            const tx = await contract.createEvent(
                eventId,
                list,
                date
            );

            setIsLoading(true);
            await tx.wait();
            setIsLoading(false);

            setEventId(eventId);
        } catch(err) {
            console.error(err);
        }
    }

    /**
     * Async processes that will run on init.
     */
    const asyncInit = async () => {
        try {
        web3Modal.current = newWeb3ModalInstance();
    
        await connectToWallet(web3Modal);

        setIsConnected(true);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Initialize app.
     */
    useEffect(() => {
        if (!isConnected) {
        asyncInit();
        }
    }, [isConnected]);

    return (
        <div>
            <Head>
                <title>Create a new Secret Santa event</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            </Head>
            { !isConnected && 
                <InfoPopup 
                    title="Not connected to an Ethereum wallet"
                    type={InfoType.Error}
                    message="For this application to work, you must connect to the an Ethereum network through a wallet like MetaMask." 
                    dismissable={false}
                />
            }

            { eventId && <InfoPopup
                title="Event created!"
                type={InfoType.Success}
                message={`Your event has been successfully created. The event ID is ${eventId}`}
            />}

            {
                isLoading && <InfoPopup 
                    title="Loading..."
                    message="Your event is being created. Please wait."
                    type={InfoType.Normal}
                />
                }
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
                                <AppButton text="CREATE SECRET SANTA" onClick={handleCreateClick} disabled={!isConnected}/>
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