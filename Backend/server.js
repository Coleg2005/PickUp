import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/profileRoutes.js';
import dotenv from 'dotenv';
import User from './models/user.js';
import http from 'http';

dotenv.config();

const app = express();

const server = http.createServer(app);


// Middleware
app.use(cors());
app.use(express.json());
// Use routes
app.use('/api/profile', profileRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 