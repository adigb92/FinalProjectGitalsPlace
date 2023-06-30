import React from "react";
import { Service } from "../../models/Service";
import { State } from "./helperFunctions";

interface ServicePickerComponentProps {
    state: {
        services: Service[];
        selectedService: Service | null;
    };
    setState: React.Dispatch<React.SetStateAction<State>>;
}

const ServicePickerComponent: React.FC<ServicePickerComponentProps> = ({ state, setState }) => {
    const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedServiceId = event.target.value;
        const selectedService = state.services.find(service => service._id === selectedServiceId) || null;
        setState(prevState => {
            return {
                ...prevState,
                selectedService: selectedService,
                availabilityChecked: false,
                isAvailable: true
            }
        });
    };

    return (
        <div>
            <label htmlFor="service">Select a service: </label>
            <select
                id="service"
                value={state.selectedService?._id}
                onChange={handleServiceChange}
            >
                <option value="" disabled>Select a service</option>
                {state.services.map((service) => (
                    <option key={service._id} value={service._id}>
                        {service.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ServicePickerComponent;
