import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

import profileRoutes from './routes/profileRoutes.js';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import friendRoutes from './routes/friendRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Use routes
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/friend', friendRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3001;

const hostname = 'localhost';

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
}); 