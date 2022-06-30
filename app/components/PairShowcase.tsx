import { Component } from "react";
import styles from '../styles/PairShowcase.module.scss';
import { AppButton } from "./AppButton";

type PairShowcaseState = {
    /**
     * Gifter from this pair.
     */
    from: string,
    /**
     * Receiver from this pair.
     */
    to: string,
}

/**
 * Renders a new pair revelation.
 * 
 * A pair consists of two names, and indicates a gifting action.
 * Meaning that the first person in the pair will be gifting something to the second person.
 */
export default class PairShowcase extends Component<PairShowcaseState, PairShowcaseState> {
    constructor(props) {
        super(props);

        this.state = {
            from: this.props.from ?? "from",
            to: this.props.to ?? "to",
        } 
    }

    render() {
        return <div className={styles.pairShowcase}>
            <div className={styles.content}>
                <p className={styles.name}>{ this.state.from }</p>
                <img src="/icons/gifts_to.svg" />
                <p className={styles.name}>{ this.state.to }</p>
            </div>
            <AppButton text="NEXT PAIR" isSecondary/>
        </div>
    }
}