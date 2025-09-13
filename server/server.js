require('dotenv').config();
const cors = require('cors');
const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

mongoose.connect(MONGO_URI).then((resp)=>{
    console.log("Connect to MongoDB")
}).catch((err)=> {
    console.log("Error connecting to MongoDB:", err);
})

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check route

app.get('/api/health', (req, res)=>{
    res.status(200).json({ message: 'Running' });
});

// add routes

app.use('/api', categoryRoutes);
app.use('/api', userRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})