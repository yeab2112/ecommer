import express from "express"
import { Register } from "../controller/usercontroller.js"
import {body} from "express-validator"
 const router=express.Router()

 router.post("/register"[
    body('name').trim().notEmpty().withMessage('name shouled not be empty'),
    body('email').trim().notEmpty().withMessage('name shouled not be empty')
    .isEmail().withMessage('invalid email'),
    body('password').trim().notEmpty().withMessage('password shouled not be empty')
.isLength({min:5,max:30}).withMessage('the password is between 5-30')
 ],Register)
 export{router}