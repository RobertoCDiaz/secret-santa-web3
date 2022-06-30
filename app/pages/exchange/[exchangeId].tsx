import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/ExchangePage.module.scss";
import { ResponsiveFooter } from "../../components/ResponsiveFooter";
import { AppButton } from "../../components/AppButton";
import { useState } from "react";
import PairShowcase from "../../components/PairShowcase";
import PreviousPairs from "../../components/PreviousPairs";
import Link from "next/link";

export default function ExchangePage() {
    const router = useRouter();
    /**
     * Params from the URL.
     */
    const { exchangeId } = router.query;

    /**
     * Whether the event has been started by the users or not.
     */
    const [hasStarted, setHasStarted] = useState(true);

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
                <PairShowcase from="me" to="you" />
            </div>
            <div className={styles.col}>
                <PreviousPairs />
            </div>
        </div>
    }

    return <div className={styles.app}>
        <Head>
            <title>Exchange</title>
        </Head>
        <div className={styles.content}>
            <div className={styles.header}>
                <h1>Exchange</h1>
                <p className={styles.info}>For { `[loading  exchange #${exchangeId}]` }</p>
            </div>

            { !hasStarted && initialScreen() }
            { hasStarted && exchangeScreen() }
        </div>
        <ResponsiveFooter />
    </div>;
}