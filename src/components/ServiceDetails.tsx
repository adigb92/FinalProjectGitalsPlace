import { FunctionComponent, useState, useEffect } from "react";
import { Service } from "../models/Service";
import { fetchServices } from "../utils/api";
import "../assets/styles/ServiceDetails.scss";

interface ServiceDetailsProps { }

const ServiceDetails: FunctionComponent<ServiceDetailsProps> = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await fetchServices();
                setServices(response);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServicesData();
    }, []);

    if (services.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="services-container">
            <h1 className="services-title">All Services</h1>
            <div className="services-grid">
                {services.map((service) => (
                    <div key={service._id} className="service">
                        <h2 className="service-name">{service.name}</h2>
                        <img className="service-image" src={service.imageUrl} alt={service.name} />
                        <p className="service-description">{service.description}</p>
                        <p className="service-price">Price: ${service.price}</p>
                        <p>Duration: {service.duration} minutes</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceDetails;
