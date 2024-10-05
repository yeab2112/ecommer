import { UserM } from "../moduls/user.js";
import { validationResult } from "express-validator"; 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer  from 'nodemailer'

dotenv.config({path:'./config/.env'})
const Register=async (req, res) => {
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
}try{
const { name, email,password} = req.body;

if (!name || !email ||!password) {
    return res.status(400).json({ error: 'Missing required fields' })};
    {
     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);        
   const newUser = new UserM ({ name, email,password:hashedPassword});
     const resalt = await newUser.save();
 const userA={...resalt,password:undefined}
   res.status(201).json({success:true, userA}) };
    }catch (error) {
   console.error('Error saving User:', error);
   res.status(500).json({ message: 'Failed to submit user' });
   }
}
    //for loginrouter.post('/login', async (req, res) => {
    const Login= async (req, res) => {
            
  try {
    const { email, password ,userType}  = req.body;

    const user = await UserM.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      { _id: user._id, role: userType},
      process.env.ACCESS_TOKEN_SECRET,{expiresIn:"3d"}
    );
 const userA ={...user._doc,password:undefined};
    res.json({success:true ,token,userA ,role: userType});
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const Auth = (req, res) => { 
  return res.status(200).json({ success: true, user: { ...req.user._doc } });
};
const Forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserM.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'The email is not exist' });
    }
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();
  
    const resetLink =` http://localhost:3000/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'asimarch2112@gmail.com',
        pass: 'ya23547840',
      },
    });
    
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
// Reset password
const Reset=async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await UserM.findOne({ email: decoded.email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
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


export{Login,Register,Auth,Forgetpassword,Reset} ;
