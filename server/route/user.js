import express from "express"
import { Register } from "../controller/user.js"
import {body} from "express-validator"
import { Contacts, Contactt } from "../controller/contact.js"
import { Products } from "../controller/product.js"
import { getAllProducts } from "../controller/product.js"
import {deleteProduct} from "../controller/product.js"
import {updateProduct} from "../controller/product.js"
import {getProductById} from "../controller/product.js"
import { Login } from "../controller/user.js"
import { verifyUser } from "../middleware/autho.js"
import { Auth } from "../controller/user.js"
import { Search } from "../controller/product.js"
import {broductDetail} from "../controller/product.js"
import { Orders } from "../controller/shipping.js"
import { Carts } from "../controller/cart.js"
import { Payment } from "../controller/payment.js"
import { OrderSummry } from "../controller/orderSummry.js"
const router=express.Router()

 router.post('/register',[
body("name").trim().notEmpty().withMessage('Name Shouled Not be Empty'),
body("email").trim().notEmpty().withMessage('Email Shouled Not be Empty')
.isEmail().withMessage('Envalid Email'),
body("password").trim().notEmpty().withMessage('Password Shouled Not be Empty')
.isLength({min:5,max:30}).withMessage('Password shouled be between 5-30')
 ],Register)

//  contact


 router.post('/contact',Contacts)
//  product

router.post('/product', Products) 
router.get('/product', getAllProducts)
router.delete('/Product/:id',deleteProduct)
router.put('/Product/:id', updateProduct);
router.get('/Product/:id',getProductById);
router.post('/login', Login)
router.get('/verify', verifyUser, Auth);  
router.get('/contact', Contactt);  
router.get('/search', Search);  
router.get('/productdetail/:id',broductDetail);
router.post('/checkout',Orders);
router.post('/cart',Carts)
router.post('/api/payments/create-payment-intent',Payment)
router.get('/orderSummry',OrderSummry)

  // Authenticati,on middleware
 

export{ router}