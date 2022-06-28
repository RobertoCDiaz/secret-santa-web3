import { Component, createRef, RefObject } from 'react';
import moment from 'moment';
import DateTime from 'react-datetime';

import styles from '../styles/DateTimePicker.module.scss';
import { createRequire } from 'module';

type TimePickerState = {
    date: moment.Moment,
    displayedDate: string,
}

/**
 * A component which a user can use to define a date and time.
 */
export default class TimePicker extends Component<any, TimePickerState> {
    private pickerRef: RefObject<DateTime>;

    constructor(props) {
        super(props);

        this.pickerRef = createRef();

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

        return <DateTime renderInput={(props, openCalendar, closeCalendar) => {

            return <div onClick={() => openCalendar()} className={styles.dateTimePicker}>
                <i className={`material-icons ${styles.icon}`}>event</i>
                <p className={styles.label}>{ this.state.displayedDate }</p>
            </div>
        }} />;
    }
}