import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: String,
    prand: String,
    catagory: String,
    price: Number,
    image: String,
    descrption: String,
    createdAt: { type: Date, default: Date.now },
    });
   
    const Product = mongoose.model('products', productSchema);
   

 export {Product}