import express from "express"
import { Forgetpassword, Reset } from "../controller/user.js"
import { Contacts, Contactt } from "../controller/contact.js"
import { UserLogin,UserRegister,AdminLogin } from "../controller/user.js"
import { Auth } from "../controller/user.js"
import { Shipping } from "../controller/shipping.js"
import { Carts } from "../controller/cart.js"
import { OrderSummary,Delete } from "../controller/orderSummry.js"
import { initiatePayment, verifyPayment } from "../controller/paymentController.js";
const userRouter=express.Router()

import { body, validationResult } from 'express-validator';

userRouter.post('/register', [
  // Validate and sanitize name
  body('name')
    .trim()
    .notEmpty().withMessage('Name should not be empty')
    .isLength({ min: 3 }).withMessage('Name should be at least 3 characters long'),

  // Validate and sanitize email
  body('email')
    .trim()
    .notEmpty().withMessage('Email should not be empty')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(), // Normalize email to handle case sensitivity

  // Validate and sanitize password
  body('password')
    .trim()
    .notEmpty().withMessage('Password should not be empty')
    .isLength({ min: 6, max: 30 }).withMessage('Password should be between 6 and 30 characters'),

  // Handle validation errors
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, UserRegister); // Proceed to the UserRegister function if validation passes



 userRouter.post('/contact',Contacts)
//  product


userRouter.post('/login', UserLogin)
userRouter.post('/login', UserRegister)
userRouter.post('/admin_login', AdminLogin)

userRouter.get('/contact', Contactt);  
userRouter.post('/cart',Carts)
userRouter.post('/shipping',Shipping)

userRouter.get('/orderSummry',OrderSummary)


userRouter.delete('/orders/:id', Delete);

userRouter.post('/forget-password',Forgetpassword)
userRouter.post('/reset-password/:token',Reset)
// Route to initiate payment
userRouter.post('/initiate', initiatePayment);

// Route to verify payment
userRouter.post('/verify/:txRef', verifyPayment);  
 

export default userRouter