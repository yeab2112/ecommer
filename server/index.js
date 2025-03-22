import express from 'express';
import cors from 'cors';
import userRouter from './router/user.js'; 
import productRouter from './router/product.js';
import './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 

app.use(cors());
app.use(express.json());  // No need for bodyParser if using express.json
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 3000;  // Added fallback for PORT

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
