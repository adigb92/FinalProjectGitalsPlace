const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Cancelled'] },
        customerName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        notes: { type: String, required: false },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

appointmentSchema.set('toJSON', { getters: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
