export interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    duration: number;
}

export interface AppointmentAvailabilityResponse {
    available: boolean;
    bookedTimeSlots: string[];
}