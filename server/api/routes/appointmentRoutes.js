const express = require('express');
const {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    checkAppointmentAvailability
} = require('../controllers/appointmentController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/')
    .get(protect, getAppointments)
    .post(protect, createAppointment);

router.route('/check')
    .get(checkAppointmentAvailability);

router.route('/:id')
    .get(protect, getAppointmentById)
    .put(protect, isAdmin, updateAppointment)
    .delete(protect, isAdmin, deleteAppointment);


module.exports = router;
