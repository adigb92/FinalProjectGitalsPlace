import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Service from '../models/Service.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

// GET all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a single service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new service (protected route)
router.post('/', auth, roleCheck(['isAdmin']), async (req, res) => {
    const { name, description, price, imageUrl, duration } = req.body;

    try {
        const newService = new Service({
            name,
            description,
            price,
            imageUrl,
            duration,
        });

        const service = await newService.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT (update) a service by ID (protected route)
router.put('/:id', auth, roleCheck(['isAdmin']), async (req, res) => {
    const { name, description, price, imageUrl, duration } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }

        service.name = name;
        service.description = description;
        service.price = price;
        service.imageUrl = imageUrl;
        service.duration = duration;

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a service by ID (protected route)
router.delete('/:id', auth, roleCheck(['isAdmin']), async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ msg: 'Service not found' });
        }
        await service.remove();
        res.json({ msg: 'Service removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
