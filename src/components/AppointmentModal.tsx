import { FunctionComponent, useState, useEffect } from "react";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { fetchServices } from "../utils/api";

interface AppointmentModalProps {
    appointment: Appointment;
    closeModal: () => void;
    updateAppointment: (id: string, data: any) => Promise<void>;
    isOpen: boolean;
}

const AppointmentModal: FunctionComponent<AppointmentModalProps> = ({
    appointment,
    closeModal,
    updateAppointment,
    isOpen,
}) => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | undefined>(appointment.service);
    const [selectedDate, setSelectedDate] = useState(new Date(appointment.startTime).toISOString().split("T")[0]);
    const [selectedTime, setSelectedTime] = useState(new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));


    useEffect(() => {
        async function fetchServicesData() {
            try {
                const response = await fetchServices();
                if (response) {
                    setServices(response);
                    if (appointment && appointment.service) {
                        const currentService = response.find((service: Service) => service._id === appointment.service._id);
                        setSelectedService(currentService);
                    }
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        }

        fetchServicesData();
    }, [appointment]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const startTime = new Date(`${selectedDate}T${selectedTime}`);
        const endTime = new Date(startTime.getTime() + (selectedService?.duration || 0) * 60000);
        await updateAppointment(appointment._id, {
            startTime,
            endTime,
            service: selectedService,
        });
        closeModal();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`modal${isOpen ? " show" : ""}`}>
            <div className="modal-content">
                <button className="close-modal" onClick={closeModal}>
                    &times;
                </button>
                <h3>Update Appointment</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="service">Service:</label>
                    <select
                        id="service"
                        value={selectedService?._id}
                        onChange={(e) => {
                            const updatedService = services.find((service: Service) => service._id === e.target.value);
                            setSelectedService(updatedService);
                        }}
                    >
                        {services &&
                            services.map((service: Service) => (
                                <option key={service._id} value={service._id}>
                                    {service.name}
                                </option>
                            ))}
                    </select>

                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />

                    <label htmlFor="time">Time:</label>
                    <input
                        id="time"
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;