// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This line loads the .env file

const Order = require('./models/orderModel');
const { sendOrderConfirmationEmails, sendContactInquiryEmails } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Configure CORS with more specific options to ensure preflight requests (OPTIONS) are handled correctly.
// This is a common solution for 'Failed to fetch' errors in development.
app.use(cors({
  origin: '*', // Allow any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
app.use(express.json()); // To parse incoming JSON request bodies

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

// ===================================================================================
// SETUP INSTRUCTIONS FOR YOUR .env FILE:
// 1. You should have a file named `.env.example` in this `/backend` directory.
// 2. Create a copy of that file and rename it to `.env`.
// 3. Open the new `.env` file and replace the placeholder with your actual
//    MongoDB Connection String. This string is secret and should not be shared.
//
// The server will read your key from the .env file and use it to connect.
// ===================================================================================

if (!MONGODB_URI) {
    console.error("\nFATAL ERROR: MONGODB_URI is not defined.");
    console.error("Please create a .env file in the /backend directory and add your MongoDB connection string.");
    console.error("See .env.example for the correct format.\n");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

// --- API Routes ---

// GET: Fetch all orders for a specific user
app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const orders = await Order.find({ userId: userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Server error while fetching orders' });
    }
});

// POST: Create a new order
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, date, total, items, user } = req.body;

        // Basic validation
        if (!userId || !date || total === undefined || !items || items.length === 0 || !user || !user.name || !user.email) {
            return res.status(400).json({ message: 'Missing required order fields' });
        }

        const newOrder = new Order({
            userId,
            date,
            total,
            items,
        });

        const savedOrder = await newOrder.save();
        
        // Asynchronously send confirmation emails without holding up the response.
        // The .toJSON() method is used to get virtuals like 'id' from the mongoose object.
        sendOrderConfirmationEmails(savedOrder.toJSON(), user);

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Server error while creating order' });
    }
});

// POST: Handle contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required contact fields' });
        }

        // Asynchronously send emails without holding up the response
        sendContactInquiryEmails(name, email, message);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error("Error handling contact form:", error);
        res.status(500).json({ message: 'Server error while handling contact form' });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});