import { Component, useState } from 'react';
import moment from 'moment';

import styles from '../styles/DateTimePicker.module.scss';

type TimePickerState = {
    date: moment.Moment,
    displayedDate: string,
}

/**
 * A component which a user can use to define a date and time.
 */
export default class TimePicker extends Component<any, TimePickerState> {
    constructor(props) {
        super(props);

        this.state = {
            date: moment(),
            displayedDate: "No date specified",
        }
    }

    /**
     * Gets the currently selected date in the component.
     * 
     * @returns Selected date.
     */
    public getDate(): moment.Moment {
        return this.state.date;
    }

    /**
     * Parses the selected `date` into a human-readable string in the given format.
     * 
     * @param format - Formatting to use to parse string. More on https://momentjs.com/docs/#/displaying/format/.
     * @returns Formatted date string.
     */
    public getDateString(format: string = "MMMM Do, YYYY [at] HH:mm a"): string {
        return this.state.date.format(format);
    }

    render() {
        const handleOnClick = () => {
            this.setState({
                date: moment(),
            })
            
            this.setState({
                displayedDate: this.getDateString(),
            })
        }

        return <div onClick={handleOnClick} className={styles.dateTimePicker}>
            <i className={`material-icons ${styles.icon}`}>event</i>
            <p className={styles.label}>{ this.state.displayedDate }</p>
        </div>;
    }
}