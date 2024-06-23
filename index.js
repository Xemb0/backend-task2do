import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRouter from './src/routers/taskRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const dbUrl = process.env.MONGODB_URI;

// Custom CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // allows access from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // specifies the methods allowed when accessing the resource
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // specifies the headers allowed
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // sends a success status for preflight requests
  } else {
    next(); // passes control to the next middleware function
  }
});

app.use(express.json());

// MongoDB Connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});