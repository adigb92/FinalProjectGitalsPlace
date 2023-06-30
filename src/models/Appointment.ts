export interface Appointment {
    _id: string;
    user: {
        _id: string;
        fullName: string;
    };
    service: {
        _id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        duration: number;
    };
    startTime: string;
    endTime: string;
    status: "Pending" | "Confirmed" | "Cancelled";
    notes: string;
    customerName: string;
    phoneNumber: string;
}
