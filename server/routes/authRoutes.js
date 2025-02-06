const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { registerUser, loginUser, validateUserId } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  },
});

const upload = multer({ storage: storage });

// Route to handle user registration with profile picture upload
router.post('/register', upload.single('profilePicture'), registerUser);

router.post('/login', loginUser);

router.get('/validatesession/:id', validateUserId);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;