const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const authMiddleware = require('./middleware/authmiddleware');
// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_ecommerce_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define your Mongoose models (e.g., Product, User) in the models folder

// Define your routes in the routes folder


app.get('/api/admin/dashboard', authMiddleware, (req, res) => {
    // Only authenticated and authorized users (e.g., admins) can access this route
    if (req.user.role === 'admin') {
      res.json({ message: 'Welcome to the Admin Dashboard!' });
    } else {
      res.status(403).json({ error: 'Unauthorized access.' });
    }
  });
  
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
