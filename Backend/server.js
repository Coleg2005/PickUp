// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { auth } from 'express-oauth2-jwt-bearer';
// import mongoose from 'mongoose';
// import userRoutes from './routes/api.js';

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Auth0 middleware - validates tokens
// const checkJwt = auth({
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   issuerBaseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Use routes
// app.use('/api', userRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

// // // Basic route
// // app.get('/', (req, res) => {
// //   res.send('Welcome to the API!');
// // });

// // // Protected API endpoint - requires valid Auth0 token
// // app.patch('/api/user/description', checkJwt, async (req, res) => {
// //   // Handle request...
// // });

// // // Example API endpoint
// // app.get('/api/data', (req, res) => {
// //   res.json({ message: 'Hello from the backend!', data: [1, 2, 3, 4] });
// // });

// // app.get('/api/user/:id', (req, res) => {
// //   const { id } = req.params;
// //   res.json({ message: `User with ID ${id} fetched.` });
// // });

// // app.post('/api/user', (req, res) => {
// //   const { name, age, id } = req.body;
// //   res.json({ message: `User ${name} of age ${age} with id of ${id} created!` });
// // });
