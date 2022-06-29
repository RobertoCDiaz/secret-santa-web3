import { Component } from 'react';
import moment, { Moment } from 'moment';
import DateTime from 'react-datetime';

import styles from '../styles/DateTimePicker.module.scss';
import 'react-datetime/css/react-datetime.css'

type TimePickerProps = {
    className?: string,
}

type TimePickerState = {
    date: moment.Moment,
    displayedDate: string,
}

/**
 * A component which a user can use to define a date and time.
 */
export default class TimePicker extends Component<TimePickerProps, TimePickerState> {
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
    public getDateString(date: Moment = this.state.date, format: string = "MMMM Do, YYYY [at] HH:mm a"): string {
        return date.format(format);
    }

    render() {
        /**
         * When the user changes the selected date or time, it will update
         * the app's state to reflect the selection.
         * 
         * @param value - Value selected within the DateTimePicker.
         */
        const handleOnTimeChange = (value: Moment) => {
            this.setState(() => {
                const toDisplay: string = this.getDateString(value);

                return {
                    date: value,
                    displayedDate: toDisplay,
                };
            })
        }

        /**
         * Checks whether a date is valid to make a new event on. The condition for a date
         * to be valid is that it must be a date after today's.
         * 
         * @param currentDate - Actual time.
         * @returns True if the date is valid, false otherwise.
         */
        const datePredicate = (currentDate: Moment) => {
            return currentDate.isAfter(moment())
        };

        return <DateTime initialValue={this.state.date} isValidDate={datePredicate} className={this.props.className} onChange={handleOnTimeChange} renderInput={(props, openCalendar, closeCalendar) => {
        
            return <div onClick={() => openCalendar()} className={styles.dateTimePicker}>
                <i className={`material-icons ${styles.icon}`}>event</i>
                <p className={styles.label}>{ this.state.displayedDate }</p>
            </div>
        }} />;
    }
}