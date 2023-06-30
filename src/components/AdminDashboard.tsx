import { FunctionComponent, useState, useEffect } from "react";
import { Service } from "../models/Service";
import { createService, fetchServices, deleteServiceById } from "../utils/api";
import { useAuthStatus } from "../hooks/useAuthStatus";
import "../assets/styles/AdminDashboard.scss";

interface AdminDashboardProps { }

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
    const { isLoggedIn, isAdmin, token } = useAuthStatus();

    const [services, setServices] = useState<Service[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        duration: 0,
    });

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServicesData();
    }, []);

    const handleDelete = async (serviceId: string) => {
        try {
            await deleteServiceById(serviceId, token ?? "");
            setServices((prevServices) =>
                prevServices.filter((service) => service._id !== serviceId)
            );
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const typedValue = (name === "price" || name === "duration") ? parseFloat(value) : value;
        setFormData({ ...formData, [name]: typedValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const authToken = token ?? "";
        try {
            const response = await createService(formData, authToken);
            const newService: Service = response.data;
            setServices((prevServices) => [...prevServices, newService]);
            setFormData({ name: "", description: "", price: 0, imageUrl: "", duration: 0 });
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    if (!isLoggedIn) {
        return <p>Please log in to access the admin dashboard.</p>;
    }

    if (!isAdmin) {
        return <p>You do not have permission to access the admin dashboard.</p>;
    }

    return (
        <>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit} className="admin-dashboard-container">
                <div className="form-group">
                    <label htmlFor="name">Service name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Service name"
                        required
                        className="form-control"
                        id="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Service description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Service description"
                        required
                        className="form-control"
                        id="description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Service price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Service price"
                        required
                        className="form-control"
                        id="price"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="form-control"
                        id="imageUrl"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Service duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Service duration (minutes)"
                        required
                        className="form-control"
                        id="duration"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    Add service
                </button>
            </form>
            <h2>Service List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Duration (minutes)</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            <td>
                                <img
                                    src={service.imageUrl}
                                    alt={service.name}
                                    width="100"
                                    height="100"
                                />
                            </td>
                            <td>{service.duration}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(service._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AdminDashboard;
