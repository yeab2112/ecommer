import { UserM } from "../moduls/user.js";
import { validationResult } from "express-validator"; 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
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
//autho
const Auth = (req, res) => { // Accept req and res parameters
  return res.status(200).json({ success: true, user: { ...req.user._doc } });
};

export{Login,Register,Auth};
