import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
import mongoose from 'mongoose';
import userRoutes from './routes/pageRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 middleware - validates tokens
const checkJwt = auth({
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});