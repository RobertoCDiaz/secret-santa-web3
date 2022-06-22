import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { AppButton } from '../components/PrimaryButton';

export default function Home() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Secret Santa Web3</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
      </Head>
      <div className={styles.content}>
        <div className={styles.section}>
          <img className={styles.appLogo} src="icons/github.svg" alt="app logo" />
          <h1>Secret Santa</h1>
          <p>
            Organize Secret Santa arrangements between you and your friends and family automatically.
          </p>
          <p>
            You don’t have to worry about somebody messing or peeking into the end result, as this app is built using web3, so it’s totally decentralized and private.
          </p>
          <AppButton text="CREATE YOUR EVENT"/>
        </div>
        <div className={styles.section}>
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
      </div>
      <div className={styles.footer}>
        <h2>Links</h2>
        <div className={styles.content}>
          <div className={styles.link}>
            <i className="material-icons">code</i>
            <a href="https://github.com/RobertoCDiaz/secret-santa-web3">Source code</a>
          </div>
          <div className={styles.link}>
            <img src="icons/github.svg" alt="github icon" />
            <a href="https://github.com/RobertoCDiaz/">@RobertoCDiaz</a>
          </div>
          <div className={styles.link}>
            <img src="icons/linkedin.svg" alt="linkedin icon" />
            <a href="https://linkedin.com/in/robertocdiaz">/in/robertocdiaz</a>
          </div>
        </div>
      </div>
    </div>
  );
}
