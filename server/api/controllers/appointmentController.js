const Appointment = require('../models/Appointment.js');
const asyncHandler = require('express-async-handler');
const Service = require('../models/Service.js');

const appointmentExists = async (serviceId, startTime, endTime) => {
    const existingAppointment = await Appointment.findOne({
        service: serviceId,
        $or: [
            { $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }] },
            { $and: [{ startTime: { $lt: endTime } }, { endTime: { $gte: endTime } }] },
            { $and: [{ startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] },
        ],
    });

    return existingAppointment;
};

const checkAppointmentAvailability = asyncHandler(async (req, res) => {
    const { serviceId, date, time } = req.query;

    // Create a date object with the time incorporated
    const startTime = new Date(date);
    const timeParts = time.split(':');
    startTime.setHours(timeParts[0], timeParts[1]);

    // Fetch the service details to calculate the endTime
    const serviceDetails = await Service.findById(serviceId);

    // Check if service exists
    if (!serviceDetails) {
        res.status(404);
        throw new Error('Service not found');
    }

    // Calculate the endTime based on the service duration
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + serviceDetails.duration);

    const existingAppointment = await appointmentExists(serviceId, startTime, endTime);

    // Query the database for appointments with the same date
    const bookedAppointments = await Appointment.find({
        service: serviceId,
        startTime: { $gte: new Date(date), $lt: new Date(date + 'T23:59:59Z') },
    });

    // Create an array of booked time slots
    const bookedTimeSlots = bookedAppointments.map((appointment) => {
        const time = appointment.startTime;
        return `${time.getHours()}:${time.getMinutes()}`;
    });

    if (existingAppointment) {
        res.status(200).json({ available: false, bookedTimeSlots });
    } else {
        res.status(200).json({ available: true, bookedTimeSlots });
    }
});

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('service');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAppointment = asyncHandler(async (req, res) => {
    const { service, date, time, customerName, phoneNumber, notes } = req.body;

    // Create a date object with the time incorporated
    const startTime = new Date(date);
    const timeParts = time.split(':');
    startTime.setHours(timeParts[0], timeParts[1]);

    // Fetch the service details to calculate the endTime
    const serviceDetails = await Service.findById(service);

    // Check if service exists
    if (!serviceDetails) {
        res.status(404);
        throw new Error('Service not found');
    }

    // Calculate the endTime
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + serviceDetails.duration);

    // Check if the appointment already exists
    const existingAppointment = await appointmentExists(service, startTime, endTime);

    if (existingAppointment) {
        res.status(400);
        throw new Error('An appointment already exists at the specified date and time.');
    }

    // Create a new appointment
    const appointment = new Appointment({
        user: req.user._id,
        service,
        startTime,
        endTime,
        customerName,
        phoneNumber,
        notes: notes ? notes : '',
    });

    // Save the appointment and return the result
    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
});

const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedAppointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.json(updatedAppointment);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            await Appointment.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Appointment successfully deleted.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAppointmentsForServiceOnDate = asyncHandler(async (req, res) => {
    const { serviceId, date } = req.query;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
        service: serviceId,
        appointmentDate: { $gte: start, $lt: end },
    });

    if (appointments) {
        res.json(appointments);
    } else {
        res.status(404);
        throw new Error('No appointments found');
    }
});

module.exports = {
    checkAppointmentAvailability,
    appointmentExists,
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForServiceOnDate,
};
