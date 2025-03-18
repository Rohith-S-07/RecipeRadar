const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Upload Configuration
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Profile Routes
router.get('/getProfile', authMiddleware, getProfile);
router.put('/updateProfile', authMiddleware, upload.single('profilePicture'), updateProfile);

module.exports = router;