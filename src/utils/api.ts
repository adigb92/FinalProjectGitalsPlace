import axios, { AxiosResponse } from "axios";
import { Service } from "../models/Service";
import { saveAuthState } from "./auth";


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

interface LoginCredentials {
    email: string;
    password: string;
}


export const fetchServices = async () => {
    try {
        const response = await api.get("/services");
        return response.data.map((service: any) => ({
            _id: service._id,
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl,
            duration: service.duration,
        }));
    } catch (error) {
        throw new Error("Error fetching services");
    }
};

export async function checkAppointmentAvailability(
    date: string,
    time: string,
    serviceId: string,
    token: string
): Promise<{ available: boolean; bookedTimeSlots: string[] }> {
    const response = await api.get(
        `/appointments/check?date=${date}&time=${time}&serviceId=${serviceId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.status !== 200) {
        throw new Error("Error checking appointment availability");
    }

    return await response.data;
}
export const createAppointment = async (
    appointmentData: {
        serviceId: string;
        date: string;
        time: string;
        customerName: string;
        phoneNumber: string;
        notes?: string;
    },
    token: string
) => {
    try {
        const response = await api.post("/appointments", appointmentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error creating appointment");
    }
};

export const fetchServiceById = (id: string) => {
    return api.get(`/services/${id}`);
};

export const createService = (data: Partial<Service>, token: string) => {
    return api.post('/services', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const updateService = (id: string, data: Partial<Service>) => {
    return api.put(`/services/${id}`, data);
};

export const deleteService = (id: string) => {
    return api.delete(`/services/${id}`);
};

export const deleteServiceById = (id: string, token: string) => {
    return api.delete(`/services/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const login = async (credentials: LoginCredentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
};


export const register = async (data: any) => {
    const response = await api.post('/auth/register', data);
    const { token } = response.data;
    const role = data.role;
    saveAuthState(token, role);
    return { token, role };
};

export const fetchAppointments = (userId?: string, token?: string) => {
    if (userId) {
        return api.get(`/appointments/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        return api.get("/appointments", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
};

export const deleteAppointment = async (id: string, token?: string) => {
    try {
        const response = await api.delete(`/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            console.error(`Error deleting appointment (Status: ${response.status}):`, response.data);
        }

        return response;
    } catch (error: any) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
};

export const updateAppointment = (id: string, data: any, token?: string) => {
    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    } : {};
    return api.put(`/appointments/${id}`, data, config);
};


export const fetchFavorites = async (): Promise<Service[]> => {
    try {
        const response: AxiosResponse<Service[]> = await axios.get("/api/services/favorites");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch favorites: " + error);
    }
};

export const fetchContents = async () => {
    try {
        const response = await api.get("/content");
        return response.data.map((content: any) => ({
            _id: content._id,
            title: content.title,
            body: content.body,
            description: content.description,
            image: content.image,
        }));
    } catch (error) {
        throw new Error("Error fetching content");
    }
};

export const fetchContentById = (id: string) => {
    return api.get(`/content/${id}`);
};

export const createContent = (data: FormData, token: string) => {
    return api.post('/content', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};


export const updateContent = async (id: string, data: FormData, token: string) => {
    try {
        const response = await api.put(`/content/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error: any) {
        console.error("Error updating content:", error.response?.data?.message || error);
        throw error;
    }
};



export const deleteContent = (id: string, token: string) => {
    return api.delete(`/content/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};
