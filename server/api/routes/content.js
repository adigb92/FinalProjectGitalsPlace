const express = require('express');
const { protect: auth, isAdmin } = require('../middleware/authMiddleware.js');

const {
    getAllContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
} = require('../controllers/contentController.js');
const multer = require('multer');

// multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

// POST a new content admin only
router.post('/', auth, isAdmin, upload.single('image'), createContent);

// GET all contents
router.get('/', getAllContents);

// GET a single content by ID
router.get('/:id', getContentById);

// PUT (update) a content by ID admin only
router.put('/:id', auth, isAdmin, updateContent);

// DELETE a content by ID admin only
router.delete('/:id', auth, isAdmin, deleteContent);

module.exports = router;
