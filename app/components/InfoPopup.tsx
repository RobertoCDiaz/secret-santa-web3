import { useState } from 'react';
import styles from '../styles/InfoPopup.module.scss';
import { AppButton } from './AppButton';

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
    dismissable?: boolean,
}

export default function InfoPopup({title, message, type = InfoType.Normal, dismissable = true}: InfoPopupProps) {
    /**
     * Whether the contnet of the popup is hidden or not.
     */
    const [isContentHidden, setIsContentHidden] = useState<boolean>(true);

    /**
     * Whether the popoup has been dismissed or nor.
     */
    const [isDismissed, setIsDismissed] = useState<boolean>(false);

    /**
     * Toggle the visibility of the content.
     */
    const handleHeaderClick = () => {
        setIsContentHidden(!isContentHidden);
    }

    /**
     * Dismisses the popup.
     */
    const handleDismissClick = () => {
        if (!dismissable)
            return;

        setIsDismissed(true);
    }

    let typeClass: string = styles.normal;
    let typeIcon: string = 'info';

    if (type === InfoType.Error) {
        typeClass = styles.error;
        typeIcon = 'report';
    } else if (type === InfoType.Success) {
        typeClass = styles.success;
        typeIcon = 'done';
    } else if (type === InfoType.Warning) {
        typeClass = styles.warning;
        typeIcon = 'warning';
    }

    return <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <div className={`${styles.infoPopup} ${typeClass} ${isDismissed ? styles.hidden : ''}`}>
            <div className={`${styles.header} ${typeClass}`} onClick={handleHeaderClick}>
                <i className="material-icons">{ typeIcon }</i>
                <p className={styles.title}>{ title }</p>
                <i className="material-icons">expand_more</i>
            </div>
            <div className={`${styles.content} ${isContentHidden ? styles.hidden : ''}`}>
                <p> { message } </p>
                { 
                    dismissable &&
                    <p className={styles.option} onClick={handleDismissClick}> Dismiss </p>
                }
            </div>
        </div>
    </div>
}