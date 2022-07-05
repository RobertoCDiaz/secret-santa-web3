import styles from '../styles/InfoPopup.module.scss';

export enum InfoType {
    Normal,
    Success,
    Warning,
    Error
};

interface InfoPopupProps {
    title: string,
    message: string,
    type?: InfoType
}

export default function InfoPopup({title, message, type = InfoType.Normal}: InfoPopupProps) {

    return <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <div className={`${styles.infoPopup} `}>
            <div className={styles.header}>
                <i className="material-icons">warning</i>
                <p className={styles.title}>{ title }</p>
                <i className="material-icons">expand_more</i>
            </div>
            <p className={styles.content}>
                { message }
            </p>
        </div>
    </div>
}