// import express from "express"
// import dotenv from "dotenv"
// // import { router } from "./route/route.js"
//  import './config/db.js'
// import cors from "cors"
// const app=express()
// dotenv.config({path:"/config/.env"})
// app.use(express.json())
// app.use(cors())
//  app.use("/con",router)
// app.listen(process.env.PORT,()=>{
//     console.log("app is running")
// })
// const express = require('express');
// const app = express();

// app.use(express.json()); // Parse JSON requests

// app.post('/con/register', (req, res) => {
//   const { email, name, password } = req.body; // Access the data

//   console.log('Received data:', email, name, password); // Log the data

//   // ... (Process data, save to database, etc.)

//   res.json({ success: true }); 
// }); const express = require('express')
import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/contact-form', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');}).catch(err => {
console.error('Error connecting to MongoDB:', err)});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },

email: { type: String, required: true },
message: { type: String, required: true },
});

const Contact = mongoose.model('contacts', contactSchema);

app.use(cors());

app.use(express.json());

app.post('/contact', async (req, res) => {
try {
const { name, email,phone ,message } = req.body;

 if (!name || !email ||!phone|| !message) {
 return res.status(400).json({ error: 'Missing required fields' });}
const newContact = new Contact({ phone,name, email, message });

await newContact.save();

res.status(201).json({ message: 'Contact submitted successfully' }) } catch (error) {
console.error('Error saving contact:', error);
res.status(500).json({ error: 'Failed to submit contact' });
}
});

app.listen(port, () => {
console.log("Server listening at http:localhost: ${port}");
});
