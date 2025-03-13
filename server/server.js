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

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes')

// Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/wishlist', wishlistRoutes);

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "Backend is awake!" });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));