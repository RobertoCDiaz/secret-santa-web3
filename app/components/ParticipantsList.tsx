import { Component, createRef, RefObject } from "react";
import Head from "next/head";
import styles from "../styles/ParticipantsList.module.scss";
import { AppButton } from "./AppButton";

type ParticipantsListState = {
    /**
     * List of participants.
     */
    participants: Participant[],
    /**
     * Whether user is currently adding a new participant or not.
     */
    isAddingParticipant: boolean,
}

/**
 * Participant struct.
 */
type Participant = {
    name: string,
    email: string,
}

/**
 * Displays a participant as an item in the list. It will show their name and email,
 * along with an option to delete this item from the app's state.
 * 
 * @param p - Participan object to be displayed.
 * @param onDeleteClick - What to do when the delete button is pressed.
 * @returns Participant component.
 */
 const Participant = (p: Participant, onDeleteClick: () => void = () => {}) => {
    return <div className={styles.participant}>
        <i className="material-icons">person</i>
        <div className={styles.info}>
            <p className={styles.name}>{ p.name }</p>
            <p className={styles.email}>{ p.email }</p>
        </div>
        <i onClick={onDeleteClick} className={`${styles.close} material-icons`}>close</i>
    </div>
}

/**
 * List of members to participate in a Secret Santa event.
 * 
 * This component has the ability to add new participants and retrieve the final list once
 * the event organizer is done making the list.
 */
export default class ParticipantsList extends Component<any, ParticipantsListState> {
    /**
     * Input element for the name of a new participant.
     */
    nameInput : RefObject<HTMLInputElement>;
    /**
     * Input element for the email of a new participant.
     */
    emailInput: RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);

        this.state = {
            isAddingParticipant: false,
            participants: [],
        }

        this.nameInput = createRef();
        this.emailInput = createRef();
    }

    componentDidUpdate() {
        if (this.state.isAddingParticipant)
            this.nameInput.current.focus();
    }

    /**
     * Retrieves the list of participants added to the event.
     * 
     * @returns List of participants.
     */
    getList(): Participant[] {
        return this.state.participants;
    }

    render() {
        /**
         * Deletes the item with a given index.
         * 
         * @param participantIndex - Index of the participant to delete.
         */
        const deleteParticipant = (participantIndex: number) => {
            this.setState({
                participants: this.state.participants.filter((v, i) => i != participantIndex)
            });
        };

        /**
         * Add a new participant item to the app's state using the information 
         * through the Add New Participant form.
         */
        const addParticipantFromForm = () => {
            if (this.nameInput.current.value === "" || this.emailInput.current.value === "") {
                alert("Fill all the requested data");
                return;
            }

            const participant: Participant = {
                name: this.nameInput.current.value,
                email: this.emailInput.current.value,
            }

            this.setState({
                participants: this.state.participants.concat(participant),
                isAddingParticipant: false,
            });
        } 

        /**
         * Toggles the visibility of the Add New Participant form.
         * 
         * @param openIt - Whether the Add New Participant form should be opened or not (e.g. closed).
         */
        const toggleAddForm = (openIt = true) => {
            this.setState({
                isAddingParticipant: openIt,
            });
        };

        return <div className={styles.root}>
            <Head>
               <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link> 
            </Head>

            {/* If `participants` state variable is empty, inform the user */}
            { !this.state.isAddingParticipant && this.state.participants.length == 0 && <p className={styles.message}>There are no participants added to this event yet</p> }
            {/* Only show this if user is not adding a new participant */}
            { !this.state.isAddingParticipant && this.state.participants.map((p, i) => 
                Participant(p, () => deleteParticipant(i))
            ) }
            { !this.state.isAddingParticipant && <AppButton text="ADD NEW PARTICIPANT" onClick={toggleAddForm} isSecondary={true} isMedium={true} /> }

            {/* Add new participant form */}
            { this.state.isAddingParticipant && <div className={styles.addForm}>
                <input ref={this.nameInput} type="text" placeholder="Name..."/>
                <input ref={this.emailInput} type="text" placeholder="Email..."/>
                <AppButton text="ADD" onClick={addParticipantFromForm} isMedium={true}/>
                <AppButton text="CANCEL" onClick={() => toggleAddForm(false)} isSecondary={true} isMedium={true}/>
            </div> }
        </div>
    }
}