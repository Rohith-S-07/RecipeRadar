const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const app = express();

dotenv.config();
connectDB();

// Configure CORS dynamically based on environment
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Use env variable for production
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));