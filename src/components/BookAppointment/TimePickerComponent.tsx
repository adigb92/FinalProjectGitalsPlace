import React from "react";
import { State } from "./helperFunctions";
import { Dispatch } from "react";

interface TimePickerComponentProps {
    state: State;
    setState: Dispatch<React.SetStateAction<State>>;
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({ state, setState }) => {
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTime = event.target.value;
        setState((prevState: State) => ({ ...prevState, selectedTime }));
    };

    return (
        <div>
            <label htmlFor="time">Select a time: </label>
            <select id="time" value={state.selectedTime} onChange={handleTimeChange}>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="19:00">07:00 PM</option>
                <option value="20:00">08:00 PM</option>
            </select>
        </div>
    );
};

export default TimePickerComponent;
