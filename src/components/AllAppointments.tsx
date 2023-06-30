import { FunctionComponent, useEffect, useState } from "react";
import { deleteAppointment, fetchAppointments, updateAppointment } from "../utils/api";
import { Appointment } from "../models/Appointment";
import { getToken, getRole } from "../utils/auth";
import AppointmentModal from "./AppointmentModal";

import "../assets/styles/AllAppointments.scss";

interface AllAppointmentsProps { }

const AllAppointments: FunctionComponent<AllAppointmentsProps> = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        async function fetchAppointmentsData() {
            const token = getToken() ?? undefined;
            const role = getRole() ?? undefined;

            if (role !== 'admin') {
                console.error("You are not authorized to access this page.");
                return;
            }

            try {
                const response = await fetchAppointments(undefined, token);
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        }

        fetchAppointmentsData();
    }, []);

    const handleDelete = async (appointmentId: string) => {
        const token = getToken() ?? undefined;

        try {
            await deleteAppointment(appointmentId, token);
            setAppointments(
                appointments.filter((appointment) => appointment._id !== appointmentId)
            );
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const handleUpdate = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    const handleUpdateAppointment = async (id: string, data: any) => {
        const token = getToken() ?? undefined;
        try {
            await updateAppointment(id, data, token);
            setAppointments(
                appointments.map((appointment) =>
                    appointment._id === id ? { ...appointment, ...data } : appointment
                )
            );
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };

    return (
        <div className="all-appointments-container">
            <h2>All Appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                            <td>{appointment.customerName}</td>
                            <td>{appointment.phoneNumber}</td>
                            <td>{appointment.service.name}</td>
                            <td>{new Date(appointment.startTime).toLocaleDateString()}</td>
                            <td>{new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td>{appointment.notes}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(appointment._id)}>
                                    Delete
                                </button>
                                <button className="update-button" onClick={() => handleUpdate(appointment)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedAppointment && (
                <AppointmentModal
                    appointment={selectedAppointment}
                    closeModal={handleCloseModal}
                    updateAppointment={handleUpdateAppointment}
                    isOpen={selectedAppointment !== null}
                />
            )}
        </div>
    );
};

export default AllAppointments;
