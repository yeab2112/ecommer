
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  address: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  totalPrice: { type: String },
  totalItem:{type:String},

      // ... other fields
      userId: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'user' // Assuming you have a 'User' model
      } , 

  products: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);



export { Order };