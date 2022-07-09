import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss'
import { BreakpointProvider, Breakpoint } from 'react-socks';

import { AppButton } from '../components/AppButton';
import { ResponsiveFooter } from '../components/ResponsiveFooter';

import { newContractInstance, connectToWallet, newWeb3ModalInstance } from '../utils/web3';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Web3Modal from 'web3modal';
import InfoPopup, { InfoType } from '../components/InfoPopup';

export default function Home() {
  /**
   * Router that allows page navigation on Next.js.
   */
  const router = useRouter();

  /**
   * Whether the app is currently connected to a wallet or not.
   */
  const [isConnected, setIsConnected] = useState<boolean>(false);

  /**
   * Object to be able to connect to a wallet.
   */
  const web3Modal: MutableRefObject<Web3Modal> = useRef();

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
    <BreakpointProvider>
      { !isConnected && 
          <InfoPopup 
            title="Not connected to an Ethereum wallet"
            type={InfoType.Warning}
            message="Right now is not necessary, but once you are creating an event, you must be connected to it in order to successfully write into the blockchain." 
          />
      }
      {
        isConnected &&
        <InfoPopup
          title="Connected to an Ethereum wallet"
          type={InfoType.Success}
          message="You are currently connected using an Ethereum wallet. You are now able to make full use of this application."
          />
      }
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
                You don’t have to worry about somebody messing or peeking into the end result, as this app uses web3 technologies to ensure a complete decentralization of the app's information.
              </p>
              <AppButton onClick={() => { router.push('/create-event') }} text="CREATE AN EVENT"/>
            </div>
          </div>
          <Breakpoint medium down>
            <div className={styles.extra}>
              <h2>How it works?</h2>
              <p>First of all, as this app works on the Ethereum blockchain, you will need a way to connect to the blockchain (typically, a wallet like MetaMask).</p>
              <p>
                Once connected to your wallet, you just have to provide a name and an email for each participant, along with the date and time for the exchange.
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
