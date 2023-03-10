const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./src/db/connect');
const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const tasks = require('./src/routes/tasks');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/tasks', tasks);

const port = process.env.PORT || 3001;

/**
 * Tries to connect to the database and starts the server.
 */
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
