import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { BreakpointProvider, Breakpoint } from 'react-socks';

import { AppButton } from '../components/AppButton';
import { ResponsiveFooter } from '../components/ResponsiveFooter';

export default function Home() {
  return (
    <BreakpointProvider>
      <div className={styles.app}>
        <Head>
          <title>Secret Santa Web3</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"></link>
        </Head>
        <div className={styles.content}>
          <Breakpoint medium down>
            <div className={styles.backgroundImage}/>
          </Breakpoint>
          <div className={styles.main}>
            <div className={styles.main}>
              <h1>Secret Santa</h1>
              <p>
                Organize Secret Santa arrangements between you and your friends and family automatically.
              </p>
              <p>
                You don’t have to worry about somebody messing or peeking into the end result, as this app is built using web3, so it’s totally decentralized and private.
              </p>
              <AppButton text="CREATE AN EVENT"/>
            </div>
          </div>
          <Breakpoint medium down>
            <div className={styles.extra}>
              <h2>How it works?</h2>
              <p>
                You just have to provide a name and an email for each participant, along with the date and time for the exchange.
              </p>
              <p>
                When you finish entering all the partipants’ data and click on the “Create Secret Santa”, every member of the exchange will receive an email indicating which other person they were assigned to.
              </p>
              <p>
                Also, in that email, there will be included a link to the event results. You’ll be able to visit this link once the date and time entered at creation have passed, and there you will find an arbitrary order that you can follow to start the exchange, one pair at a time.
              </p>
            </div>
          </Breakpoint>
        </div>
        <ResponsiveFooter />
        <Breakpoint large up>
          <div className={styles.howItWorks}>
            <h2>How it works?</h2>
            <p>
              You just have to provide a name and an email for each participant, along with the date and time for the exchange.
            </p>
            <p>
              When you finish entering all the partipants’ data and click on the “Create Secret Santa”, every member of the exchange will receive an email indicating which other person they were assigned to.
            </p>
            <p>
              Also, in that email, there will be included a link to the event results. You’ll be able to visit this link once the date and time entered at creation have passed, and there you will find an arbitrary order that you can follow to start the exchange, one pair at a time.
            </p>
          </div>
        </Breakpoint>
      </div>
    </BreakpointProvider>
  );
}
