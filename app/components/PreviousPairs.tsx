import { Component } from "react";
import styles from '../styles/PreviousPairs.module.scss';

type PreviousPairsState = {
    /**
     * List of names, sorted by giving order.
     */
    history: string[],
    /**
     * Whether the list is complete or nor.
     */
    isComplete: boolean,
}

/**
 * Renders a list of the previous pairs that have already been revealed.
 * 
 * This components consists of a list of names, in which each element will be paired to the next one.
 * 
 * The last element of the list will not be shown as a gifter because the person that follows it has not yet been added, unless it's explicitely told that the list has been completed, as the last person in the list will be gifting to the first one. In that case, the last element of the list will be paired with the first one.
 */
export default class PreviousPairs extends Component<any, PreviousPairsState> {
    constructor(props) {
        super(props);

        this.state = {
            isComplete: false,
            history: [],
        };
    }

    /**
     * Adds a new member name to the component's state.
     * 
     * There's no need to add a whole pair, as every item from the list will be
     * automatically paired up with the next one in line (except the last one, as the person it is assigned
     * to is not yet revealed).
     * 
     * When an item that matches the first element is added though this function, it will not be added to the list. Instead, it will change the component state and set the `isComplete` variable to true. Indicating that the list has been completed.
     * 
     * If the list is already completed, adding new items will no longer be allowed.
     * 
     * @param item - Name of the person to add.
     */
    addItem(pair) {
        if (this.state.history.length === 0) {
            this.setState({
                history: this.state.history.concat(pair.from, pair.to),
            });
            return;
        }

        if (this.state.isComplete) {
            return;
        }

        if (pair.to === this.state.history[0]) {
            this.setState({
                isComplete: true,
            });
        }

        this.setState({
            history: this.state.history.concat(pair.to),
        });
    }

    render() {
        const PairComponent = (from: string, to: string) => {
            return <div className={styles.pair}>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <p className={styles.name}>{ from }</p>
                <i className="material-icons">arrow_forward_ios</i>
                <p className={styles.name}>{ to }</p>
            </div>
        }

        // if list is empty, must not render anything
        if (this.state.history.length === 0) {
            return null;
        }

        return <div className={styles.previousPairs}>
            <h1>Previous pairs</h1>
            { this.state.history.map((name, idx) => {
                if (idx == this.state.history.length - 1)
                    return null;

                return PairComponent(name, this.state.history[idx + 1]);
            }) }
        </div>;
    }
}