const express = require('express');
const {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} = require('../controllers/serviceController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/').get(getServices).post(protect, isAdmin, createService);
router
    .route('/:id')
    .get(getServiceById)
    .put(protect, isAdmin, updateService)
    .delete(protect, isAdmin, deleteService);

module.exports = router;
