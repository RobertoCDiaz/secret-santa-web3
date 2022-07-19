import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/ResponsiveFooter.module.scss';

export const ResponsiveFooter = () => {
    return <div className={styles.responsiveFooter}>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <h2>Links</h2>
      <div className={styles.content}>
        <a className={styles.link} href="https://github.com/RobertoCDiaz/secret-santa-web3">
          <i className="material-icons">code</i>
          <p>Source code</p>
        </a>
        <a className={styles.link} href="https://github.com/RobertoCDiaz/">
          <Image src="/icons/github.svg" alt="github icon" />
          <p>@RobertoCDiaz</p>
        </a>
        <a className={styles.link} href="https://linkedin.com/in/robertocdiaz">
          <Image src="/icons/linkedin.svg" alt="linkedin icon" />
          <p>/in/robertocdiaz</p>
        </a>
      </div>
    </div>;
}