// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This line loads the .env file

const Order = require('./models/orderModel');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// A more explicit CORS configuration to handle preflight (OPTIONS) requests, a common cause of "Failed to fetch".
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));
app.use(express.json()); // To parse incoming JSON request bodies

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// ===================================================================================
// SETUP INSTRUCTIONS FOR YOUR .env FILE:
// 1. You should have a file named `.env.example` in this `/backend` directory.
// 2. Create a copy of that file and rename it to `.env`.
// 3. Open the new `.env` file and add your secret keys:
//    - MONGODB_URI: Your actual MongoDB Connection String.
//    - RESEND_API_KEY: Your key from Resend for sending emails.
//
// These keys are secret and should not be shared.
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
        const { userId, date, total, items } = req.body;

        // Basic validation
        if (!userId || !date || total === undefined || !items || items.length === 0) {
            return res.status(400).json({ message: 'Missing required order fields' });
        }

        const newOrder = new Order({
            userId,
            date,
            total,
            items,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Server error while creating order' });
    }
});

// POST: Send an email
app.post('/api/send-email', async (req, res) => {
    const { to, subject, htmlContent } = req.body;

    if (!to || !subject || !htmlContent) {
        return res.status(400).json({ message: 'Missing required email fields' });
    }
    
    // Fallback for development if RESEND_API_KEY is not set
    if (!RESEND_API_KEY) {
        console.groupCollapsed(`[Email Simulation] To: ${to} | Subject: ${subject}`);
        console.warn(`--- RESEND_API_KEY not configured on server. Simulating email send. ---`);
        console.log(`FROM: Flora & Form <onboarding@resend.dev>`);
        console.log(`TO: ${to}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`--- HTML BODY ---`);
        console.log(htmlContent);
        console.log(`--------------------`);
        console.groupEnd();
        return res.status(200).json({ message: 'Email simulated successfully as RESEND_API_KEY is not set.' });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Flora & Form <onboarding@resend.dev>',
                to: [to],
                subject: subject,
                html: htmlContent,
            }),
        });
        
        const data = await response.json();

        if (response.ok) {
            console.log(`Email sent successfully via Resend to ${to}`);
            res.status(200).json({ message: 'Email sent successfully', data });
        } else {
            console.error(`Failed to send email to ${to}:`, response.status, response.statusText, data);
            res.status(response.status).json({ message: 'Failed to send email via Resend', error: data });
        }
    } catch (error) {
        console.error('Error proxying email to Resend:', error);
        res.status(500).json({ message: 'Server error while sending email' });
    }
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});