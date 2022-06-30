import styles from '../styles/AppButton.module.scss';

/**
 * Defines the types of the props for the PrimaryButton.
 */
type AppButtonProps = {
    text?: string,
    onClick?: () => void,
    isSecondary? : boolean,
    isMedium?: boolean,
    disabled?: boolean
}

/**
 * A simple button component with the app's styles applied.
 * 
 * @param text - Text to be displayed inside the button.
 * @param onClick - Action to execute once the user clicks the button.
 * @param isSecondary - Whether should return a secondary styled button.
 * @param isMedium - Whether should return a medium sized button.
 * @returns AppButton component
 */
export const AppButton = ({text = "", onClick = () => {}, isSecondary = false, isMedium = false, disabled = false}: AppButtonProps) => {
    const buttonStyles: string[] = [styles.button];

    buttonStyles.push(!isSecondary ? styles.primary : styles.secondary);

    buttonStyles.push(!isMedium ? styles.large : styles.medium);

    buttonStyles.push(disabled ? styles.disabled : '');

    return <div className={buttonStyles.join(" ")} onClick={onClick}>
        {text}
    </div>
}