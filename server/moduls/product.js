import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    brand: { type:String,required:true},
    category: { type:String,required:true},
    price: {type:Number,required:true},
    image: { type:String , required:true},
    size:{type:Array,required:true},
    bestseller:{ type:Boolean},
    descrption: {type:String, required:true},
    createdAt: { type: Date, default: Date.now },
    });
   
    const Product = mongoose.model('product', productSchema);
   

 export {Product}