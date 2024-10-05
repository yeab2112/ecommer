import express from 'express';
import cors from 'cors';
import { router } from './route/user.js';
import './config/db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();


const app = express(); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', router);


    


app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
