const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

exports.handleContactForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    try {
        const newContactMessage = new Contact({
            name,
            email,
            message
        });

        const contactMessage = await newContactMessage.save();

        res.status(200).json({ message: 'Contact form submitted successfully', contactMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
