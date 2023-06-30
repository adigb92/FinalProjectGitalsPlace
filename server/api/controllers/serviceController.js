const Service = require('../models/Service.js');
const { validateServiceInput } = require('../validation/serviceValidation.js');

const createService = async (req, res) => {
    const { error } = validateServiceInput(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description, price, imageUrl, duration } = req.body;

    try {
        const newService = new Service({
            name,
            description,
            price,
            imageUrl,
            duration,
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (err) {
        res.status(500).json({ message: 'Error creating service', error: err });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services', error: err });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching service', error: err });
    }
};

const updateService = async (req, res) => {
    const { error } = validateServiceInput(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (err) {
        res.status(500).json({ message: 'Error updating service', error: err });
    }
};

const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting service', error: err });
    }
};

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
};
