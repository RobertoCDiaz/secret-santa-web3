// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SecretSantaOrganizer {
    /**
        @dev Basic structure that defines the shape of an event.
     */
    struct Event {
        /**
            @dev List of the names of the participants of the event, already sorted by giving order.
         */
        string[] participants;

        /**
            @dev Timestamp of the date and time of the event.
         */
        uint256 date;

        /**
            @dev This attribute can be used to check whether the event exists or nor.
         */
        bool exists;
    }

    /**
        @dev Mapping from an `eventId: string` to an Event object.
     */
    mapping(string => Event) private _events;

    /**
        @dev Number of events currently held by a contract instance.
     */
    uint256 private _eventsCount;

    /**
        @dev Adds a new event to this contract instance. 

        @param eventId - Unique random ID that the new event should have.
        @param participants - List of participants. The list of participants must come already randomly shuffled, as it is the way it will be shown at the moment of the event.
        @param date - Timestamp for when the event's gonna be.
     */
    function createEvent(string memory eventId, string[] memory participants, uint256 date) external {
        Event storage newEvent = _events[eventId];

        newEvent.participants = participants;
        newEvent.date = date;
        newEvent.exists = true;

        ++_eventsCount;
    }

    /**
        @dev Retrieves the list of participants already sorted by giving order. It will only return the list if the event's date has been passed, to prevent peeking.

        @param eventId - ID of the event from which we want the list of participants of.
     */
    function getOrder(string memory eventId) external view returns (string[] memory) {
        Event storage e = _events[eventId];

        require(e.date <= block.timestamp, "Event's due date still not reached");

        return e.participants;
    }

    /**
        @dev Get the date of an event. It can be useful to check in the frontend whether the event
        has started or not, providing the exact date and time of start to maybe show a countdown.

        @param eventId - ID of the event.
     */
    function getEventDate(string memory eventId) external view returns (uint256) {
        Event storage e = _events[eventId];

        return e.date;
    }

    /**
        @dev Checks the existence of an event.

        @param eventId - ID of the event to check its existence of.

        @return bool A value indicating whether the event exists or not.
     */
    function eventExists(string memory eventId) external view returns (bool) {
        return _events[eventId].exists;
    }
}