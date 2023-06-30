import { FunctionComponent, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface BookingCreatedState {
    appointmentDetails: {
        serviceName: string;
        appointmentDate: string;
        appointmentTime: string;
    };
}

const BookingCreated: FunctionComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !("appointmentDetails" in location.state)) {
            navigate("/home");
        }
    }, [location, navigate]);

    const handleGoBack = () => {
        navigate("/home");
    };

    return (
        (location.state && "appointmentDetails" in location.state) ? (
            <div>
                <h1>Booking Created</h1>
                <p>
                    Your appointment for <strong>{(location.state as { appointmentDetails: BookingCreatedState['appointmentDetails'] }).appointmentDetails.serviceName}</strong>{" "}
                    has been successfully booked on{" "}
                    <strong>{(location.state as { appointmentDetails: BookingCreatedState['appointmentDetails'] }).appointmentDetails.appointmentDate}</strong> at{" "}
                    <strong>{(location.state as { appointmentDetails: BookingCreatedState['appointmentDetails'] }).appointmentDetails.appointmentTime}</strong>.
                </p>
                <button onClick={handleGoBack}>Go back to the main page</button>
            </div>
        ) : null
    );
}

export default BookingCreated;
