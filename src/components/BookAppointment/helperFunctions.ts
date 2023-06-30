import { fetchServices, createAppointment } from "../../utils/api";
import { toast } from 'react-toastify';
import { Service } from "../../models/Service";
import { Dispatch, SetStateAction } from "react";

export interface AvailabilityData {
    available: boolean;
    bookedTimeSlots?: string[];
}

export interface State {
    services: Service[];
    selectedDate: Date;
    selectedTime: string;
    selectedService: Service | null;
    isAvailable: boolean;
    availabilityChecked: boolean;
    endTime: string;
    bookedTimeSlots: string[];
    customerName: string;
    phoneNumber: string;
    notes: string;
}

export const fetchData = async (setState: Dispatch<SetStateAction<State>>) => {
    try {
        const data = await fetchServices();
        setState(prevState => ({ ...prevState, services: data, selectedService: data[0] }));
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

export const handleSubmit = async (
    state: State,
    checkAvailability: () => Promise<void>,
    navigate: (path: string, state?: any) => void,
    token: string
) => {
    if (!state.selectedService) {
        toast.error("No service selected.");
        return;
    }

    if (!token) {
        toast.error("No token found. Please log in.");
        return;
    }

    await checkAvailability();
    if (!state.isAvailable) {
        toast.error("The selected appointment time is no longer available. Please choose a different time.");
        return;
    }

    const appointmentData = {
        date: `${state.selectedDate.getFullYear()}-${state.selectedDate.getMonth() + 1}-${state.selectedDate.getDate()}`,
        time: state.selectedTime,
        endTime: state.endTime,
        serviceId: state.selectedService._id,
        service: state.selectedService,
        customerName: state.customerName,
        phoneNumber: state.phoneNumber,
        notes: state.notes,
    };

    try {
        const data = await createAppointment(appointmentData, token);
        if (data) {
            navigate("/success", {
                state: {
                    appointmentDetails: {
                        serviceName: state.selectedService.name,
                        appointmentDate: appointmentData.date,
                        appointmentTime: state.selectedTime,
                    }
                }
            });
            toast.success("Appointment booked successfully");
        } else {
            toast.error("Failed to book appointment");
        }
    } catch (error) {
        toast.error("Error booking appointment");
    }
};
