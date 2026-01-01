const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*", // Allow all origins for simplicity to ensure Vercel frontend can connect
    credentials: true
}));

// Connect to Mongo
connectDB().then(() => console.log('MongoDB Connected...'));

// Root Route
app.get('/', (req, res) => {
    res.send('API is running successfully');
});

// Use Routes
app.use('/api', require('./routes/auth'));

// For Vercel, we export the app
module.exports = app;

// Only listen if not in Vercel environment
if (require.main === module) {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
}
