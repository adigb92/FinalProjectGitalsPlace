import React, { FunctionComponent, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import CustomerInfoComponent from "./CustomerInfoComponent";
import NotesComponent from "./NotesComponent";
import TimePickerComponent from './TimePickerComponent';
import ServicePickerComponent from './ServicePickerComponent';
import { toast } from 'react-toastify';
import { checkAppointmentAvailability } from "../../utils/api";
import { fetchData, handleSubmit, AvailabilityData, State } from "./helperFunctions";
import { useAuthContext } from "../../contexts/AuthContext";

interface BookAppointmentProps { }

const BookAppointment: FunctionComponent<BookAppointmentProps> = () => {
    const [state, setState] = useState<State>({
        services: [],
        selectedDate: new Date(),
        selectedTime: "09:00",
        selectedService: null,
        isAvailable: true,
        availabilityChecked: false,
        endTime: "",
        bookedTimeSlots: [],
        customerName: "",
        phoneNumber: "",
        notes: ""
    });

    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStatus();

    const { token } = useAuthContext();

    const checkAvailability = useCallback(async () => {
        if (!state.selectedService?._id) {
            toast.error("No service selected. Please select a service.");
            return;
        }

        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }

        const formattedDate = `${state.selectedDate.getFullYear()}-${("0" + (state.selectedDate.getMonth() + 1)).slice(-2)}-${("0" + state.selectedDate.getDate()).slice(-2)}`;
        const availabilityData: AvailabilityData = await checkAppointmentAvailability(formattedDate, state.selectedTime, state.selectedService._id, token);

        const isAvailable = availabilityData.available && !availabilityData.bookedTimeSlots?.includes(state.selectedTime);
        setState(prevState => ({
            ...prevState,
            availabilityChecked: true,
            isAvailable,
        }));
    }, [state, token]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitLocal = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);

        const newState = { ...state };
        if (!newState.customerName || !newState.phoneNumber) {
            toast.error("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        const israelPhoneNumberRegex = /^0(5[02-9]|77)[0-9]{7}$/;
        if (!israelPhoneNumberRegex.test(newState.phoneNumber)) {
            toast.error("Please enter a valid Israel phone number.");
            setIsLoading(false);
            return;
        }

        if (newState.customerName.length <= 1) {
            toast.error("Please enter a valid name.");
            setIsLoading(false);
            return;
        }

        newState.notes = newState.notes || "";

        if (!token) {
            toast.error("No token found. Please log in.");
            setIsLoading(false);
            return;
        }

        await handleSubmit(newState, checkAvailability, navigate, token);
        setIsLoading(false);
    }, [
        isLoading,
        state,
        checkAvailability,
        navigate,
        token,
    ]);

    useEffect(() => {
        fetchData(setState);
    }, [isLoggedIn]);

    return (
        <div className="bookAppointmentContainer container p-4">
            <h1 className="text-center mb-4" style={{ color: "#C5948A" }}>Book an Appointment</h1>
            <div className="formContainer card p-4 mx-auto" style={{ maxWidth: "600px", backgroundColor: "#F6E0DB" }}>
                <CustomerInfoComponent state={state} setState={setState} />
                <DatePicker
                    selected={state.selectedDate}
                    onChange={(date: Date) => setState(prevState => ({ ...prevState, selectedDate: date }))}
                    minDate={new Date()}
                    inline
                    className="my-3"
                />
                <TimePickerComponent state={state} setState={setState} />
                <ServicePickerComponent state={state} setState={setState} />
                <NotesComponent state={state} setState={setState} />
                <button onClick={checkAvailability} disabled={state.selectedService === null} className="btn btn-outline-dark my-2">
                    Check availability
                </button>
                {state.availabilityChecked &&
                    (state.isAvailable ? (
                        <div className="availabilityConfirmed alert alert-success mt-3">
                            <p>Your selected time slot is available. You can confirm your booking.</p>
                            <button onClick={handleSubmitLocal} disabled={isLoading} className="btn btn-dark mt-2">
                                Confirm booking
                            </button>
                        </div>
                    ) : (
                        <div className="availabilityDenied alert alert-danger mt-3">
                            <p>Your selected time slot is not available. Please select another time slot.</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BookAppointment;