const express = require('express');
const connectDB = require('./utils/database');
const auth = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', auth, require('./routes/profile'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
