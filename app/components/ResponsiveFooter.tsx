import styles from '../styles/ResponsiveFooter.module.scss';

export const ResponsiveFooter = () => {
    return <div className={styles.responsiveFooter}>
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
}