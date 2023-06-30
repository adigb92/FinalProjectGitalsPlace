const Content = require("../models/Content.js");
const path = require('path');

const getAllContents = async (req, res) => {
    try {
        const contents = await Content.find({});
        res.json(contents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ msg: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createContent = async (req, res) => {
    const { title, body, description } = req.body;

    try {
        const newContent = new Content({
            title,
            body,
            description,
            image: '/uploads/' + path.basename(req.file.path),
        });

        const content = await newContent.save();
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateContent = async (req, res) => {
    const { title, body, description } = req.body;

    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ msg: 'Content not found' });
        }

        if (title && title.trim() !== '') content.title = title;
        if (body && body.trim() !== '') content.body = body;
        if (description && description.trim() !== '') content.description = description;

        await content.save();
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ msg: 'Content not found' });
        }

        await Content.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Content removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent
};
