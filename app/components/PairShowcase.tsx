import { useState } from "react";
import { reduceEachTrailingCommentRange } from "typescript";
import styles from '../styles/PairShowcase.module.scss';
import { AppButton } from "./AppButton";

type PairShowcaseProps = {
    /**
     * List of the names of every person in the event, sorted by giving order.
     * 
     * E.g. `list[0]` has to give something to `list[1]`, `list[1]` to `list[2]`, and so on.
     * 
     * At the end of a list of `length = n`, `list[n - 1]` is assigned to give to `list[0]`.
     */
    list: string[],

    /**
     * What to do when the "Next Pair" button is clicked.
     * @param pair - Current pair when button is clicked.
     */
    onNextClicked?: (pair: Pair) => void,
}

/**
 * Basic structure of a pairing.
 * 
 * What this means is that `from` is assined to give a present to `to`.
 */
type Pair = {
    from: string,
    to: string,
}

/**
 * Renders a new pair revelation.
 * 
 * A pair consists of two names, and indicates a gifting action.
 * Meaning that the first person in the pair will be gifting something to the second person.
 * 
 * @param props - Props of the component.
 * @returns PairShowcase component.
 */
 export default function PairShowcase({list, onNextClicked = (p) => {}}: PairShowcaseProps) {
     /**
      * Whether the exchange has been completed or not.
      * 
      * For a exchange to be called "completed", all of it's pairs must've been revealed.
      */
    const [completed, setCompleted] = useState<boolean>(false);

    /**
     * Current index inside the sorted list of pairs.
     */
    const [currentIdx, setCurrentIdx] = useState<number>(0);

    /**
     * Current pair.
     */
    const [currentPair, setCurrentPair] = useState<Pair>({
        from: list[0],
        to: list[1],
    });

    /**
     * When executed, changes the current pair to the next one in line.
     * It uses the `currentIndex` state variable to calculate the next pair,
     * and changes it aswell.
     */
     const handleNextClick = () => {
        if (completed) {
            return;
        }

        const newIdx = (currentIdx + 1) % (list.length);

        onNextClicked(currentPair);

        setCurrentIdx(newIdx);
        setCurrentPair({
            from: list[(newIdx) % (list.length)],
            to: list[(newIdx + 1) % (list.length)],
        });

        if (currentIdx == list.length - 1) {
            setCompleted(true);
        }
    }

    if (list.length === 0)
        return null;

    return <div className={styles.pairShowcase}>
        { !completed && <div className={styles.content}>
            <p className={styles.name}>{ currentPair.from }</p>
            <img src="/icons/gifts_to.svg" />
            <p className={styles.name}>{ currentPair.to }</p>
        </div> }
        { completed && <div className={styles.info}>
            There are no more pairs!
        </div> }
        <AppButton text="NEXT PAIR" isSecondary onClick={handleNextClick} disabled={completed}/>
    </div>; 
}