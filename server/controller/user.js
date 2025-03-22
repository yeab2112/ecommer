import { UserModel } from "../moduls/user.js"; 
import { validationResult } from "express-validator"; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import validator from 'validator';  // Import the validator package

dotenv.config({ path: './config/.env' });

const UserRegister = async (req, res) => {
try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({ name, email, password: hashedPassword });

    // Save the user to the database
    const result = await newUser.save();

    // Remove the password field from the response
    const userA = { ...result.toObject(), password: undefined };

    // Send success response
    res.status(201).json({ success: true, userA });

  } catch (error) {
    console.error('Error saving User:', error);
    res.status(500).json({ message: 'Failed to submit user' });
  }
};

// User Login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'The Email does not exit' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3d" }
    );

    // Remove password from user object for response
    const userA = { ...user._doc, password: undefined };

    // Send success response with token and user info
    res.json({ success: true, token, userA,message:"" });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Admin Login 


const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Log received credentials (for debugging)
  console.log("Entered Email:", email);
  console.log("Entered Password:", password);
  console.log("Expected Email:", process.env.ADMIN_EMAIL);
  console.log("Expected Password:", process.env.ADMIN_PASSWORD);


  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Ensure environment variables are loaded
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Validate admin credentials
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    try {
      // Create a token with a payload (admin email)
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Log the token for debugging (REMOVE IN PRODUCTION)
      console.log("Generated JWT Token: ", token);

      // Send token in response
      return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
      console.error("Error generating token:", error);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
}


// Authenticated User Info
const Auth = (req, res) => { 
  return res.status(200).json({ success: true, user: { ...req.user._doc } });
};

// Forgot Password
const Forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'The email does not exist' });
    }

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    
    // Setup email transporter using environment variables for security
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Move your email user to .env
        pass: process.env.EMAIL_PASS,  // Move your email password to .env
      },
    });

    // Send reset email
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="${resetLink}">link</a> to set a new password.</p>
      `,
    });
    
    res.send('Reset link sent to your email');
      
  } catch (error) {
    console.error('Error saving User:', error);
    res.status(500).json({ message: 'Failed to submit user' });
  }
};

// Reset Password
const Reset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await UserModel.findOne({ email: decoded.email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
  } catch (err) {
    return res.status(400).send('Invalid or expired token');
  }

  if (!user) {
    return res.status(404).send('User not found');
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.send('Password has been reset');
};

export { UserLogin, UserRegister, AdminLogin, Auth, Forgetpassword, Reset };
