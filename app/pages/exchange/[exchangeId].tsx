import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/ExchangePage.module.scss";
import { ResponsiveFooter } from "../../components/ResponsiveFooter";
import { AppButton } from "../../components/AppButton";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import PairShowcase from "../../components/PairShowcase";
import PreviousPairs from "../../components/PreviousPairs";
import Web3Modal from 'web3modal';
import { connectToWallet, newContractInstance, newWeb3ModalInstance } from "../../utils/web3";
import moment, { Moment } from "moment";

export default function ExchangePage() {
    const router = useRouter();
    /**
     * Exchange ID param, from the URL.
     */
    let exchangeId: string | string[];

    /**
     * Whether the event has been started by the users or not.
     */
    const [hasStarted, setHasStarted] = useState<boolean>(false);

    /**
     * State of the connection to an Ethereum wallet.
     */
    const [isConnected, setIsConnected] = useState<boolean>(false);

    /**
     * Event's date represented in a Moment object.
     */
    const [eventTimestamp, setEventTimestamp] = useState<Moment>();

    /**
     * List of the exchange already sorted by giving order.
     */
    const [eventOrder, setEventOrder] = useState<string[]>();

    /**
     * Web3Modal object to connect to a wallet.
     */
    const web3Modal: MutableRefObject<Web3Modal> = useRef();

    /**
     * Reference to the PreviousPairs component.
     */
    const previousPairsComponent: MutableRefObject<PreviousPairs> = useRef();

    /**
     * Checks if the current event exists.
     * 
     * It checks the exchange ID against the stored events inside
     * the smart contract. If it not exists, it means that there's no
     * event with such exchange ID. Thus, the client will be redirected
     * to the homepage.
     */
    const checkIfEventExists = async () => {
        try {
            const contract = await newContractInstance(web3Modal);

            const exists = await contract.eventExists(exchangeId);

            if (!exists) {
                router.replace('/');
            }
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * Screen to indicate the user that the date of the event has not been reached yet.
     * 
     * @returns EventStillNotAvailable component.
     */
    const eventStillNotAvailable = () => {
        const handleHomePageClick = () => {
            router.replace('/');
        }

        return <div className={styles.eventStillNotAvailable}>
            <i className="material-icons">calendar_month</i>
            <p className={styles.title}>This event is not available yet</p>
            <p className={styles.content}>Wait until the date and time indicated above.</p>
            <AppButton text="Go to homepage" isSecondary isMedium onClick={handleHomePageClick}/>
        </div>
    }

    /**
     * Renders a button that enables the users to start an exchange.
     * 
     * @returns InitialScreen component.
     */
    const initialScreen = () => {
        /**
         * Starts the exchange and changes the app's state to reflect it.
         */
        const startExchange = () => {
            setHasStarted(true);
        }

        return <div className={styles.initialScreen}>
            <p>Once you're all set and ready to start the exchange, press the following button</p>
            <AppButton text="START EXCHANGE" onClick={startExchange} />
        </div>
    }

    /**
     * Renders the actual exchange screen for the event.
     * 
     * This will show a description of how it works, a PairShowcase to show the current
     * pair (indicating who should be presenting their gift along who will receive said gift), and a list of the previous pairs (i.e. a history of the pairs that have already been revealed).
     * 
     * @returns ExchangeScreen component.
     */
    const exchangeScreen = () => {
        if (!eventOrder) {
            return null;
        }

        const handleOnNextPairClicked = (pair) => {
            previousPairsComponent.current.addItem(pair);
        }

        return <div className={styles.exchangeScreen}>
            <div className={styles.col}>
                <div className={styles.info}>
                    <p>
                        If you want to, you can follow the order that we give you to decide who wil start the exchange and work it up to the end.
                    </p>
                    <p>
                        Just click on the Next Pair button so we can show you whose turn it is to give their present, and who will receive it!
                    </p>
                </div>
                <PairShowcase list={eventOrder} onNextClicked={handleOnNextPairClicked} />
            </div>
            <div className={styles.col}>
                <PreviousPairs ref={previousPairsComponent} />
            </div>
        </div>
    }

    /**
     * Renders different components depending on the state of the app.
     * 
     * It handles the cases for when the event date has not been reached yet, for when 
     * is has not been started by the user, and for when both conditions are met.
     * 
     * @returns Appropiate screen component.
     */
    const stateScreen = () => {
        if (!eventTimestamp)
            return null;

        if (!eventTimestamp.isBefore(moment()))
            return eventStillNotAvailable();

        if (!hasStarted)
            return initialScreen();
        
        return exchangeScreen();
    }

    /**
     * Creates a new contract instance using a provider to fetch
     * data from the blockchain state. Retrieves all the relevant data
     * from the smart contract of the event.
     */
    const retrieveEventData = async () => {
        try {
            const contract = await newContractInstance(web3Modal);
    
            // gets event date
            const dateTimestamp: number = (await contract.getEventDate(exchangeId)).toNumber();
            setEventTimestamp(moment(dateTimestamp * 1000));
            
            // event's date not reached yet
            if (moment(dateTimestamp * 1000).isAfter(moment())) {
                // retrieve data again in 30 seconds
                setTimeout(() => {
                    retrieveEventData();
                }, 30 * 1000);

                return;
            }

            const order = await contract.getOrder(exchangeId);
            setEventOrder(order);
            
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Async initialization process.
     */
    const asyncInit = async () => {
        if (!isConnected) {
            web3Modal.current = newWeb3ModalInstance();

            await connectToWallet(web3Modal);

            setIsConnected(true);
            return;
        }
        
        await checkIfEventExists();
        await retrieveEventData();
    }

    /**
     * Init process.
     */
    useEffect(() => {
        if (!router.isReady)
            return;

        exchangeId = router.query.exchangeId;
        asyncInit();
    }, [router.isReady, isConnected]);

    return <div className={styles.app}>
        <Head>
            <title>Exchange</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <div className={styles.content}>
            <div className={styles.header}>
                <h1>Exchange</h1>
                { eventTimestamp &&
                    <p className={styles.info}>For { eventTimestamp.format("MMMM Do, YYYY [at] HH:mm a") }</p>
                }
            </div>
            
            { stateScreen() }
        </div>
        <ResponsiveFooter />
    </div>;
}