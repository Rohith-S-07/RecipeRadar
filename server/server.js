const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

dotenv.config();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/category-images', express.static('category-images'));
app.use('/uploads/groups', express.static('uploads/groups'));


const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const tagRoutes = require('./routes/tagRoutes');
const contactRoutes = require('./routes/contactRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');




// Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);
app.use('/tags', tagRoutes);
app.use('/contact', contactRoutes);
app.use('/groups', groupRoutes);
app.use('/messages', messageRoutes);





app.get('/ping', (req, res) => {
    res.status(200).json({ message: "Backend is awake!" });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));