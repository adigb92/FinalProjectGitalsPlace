/* eslint-disable import/first */
const dotenv = require('dotenv');
dotenv.config({ path: './server/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/connectDB.js');

// Import routes
const contactRoutes = require('./api/routes/contactRoutes');
const serviceRoutes = require('./api/routes/serviceRoutes.js');
const appointmentRoutes = require('./api/routes/appointmentRoutes.js');
const authRoutes = require('./api/routes/auth.js');
const contentRoutes = require('./api/routes/content');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// A middleware to serve files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
