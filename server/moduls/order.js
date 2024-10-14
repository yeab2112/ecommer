import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  address: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  totalPrice: { type: String },
  totalItem: { type: String },

  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' // Ensure this matches your User model name
  }, 
  products: [{ // Changed to an array of ObjectIds
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'product' // Ensure this matches your Product model name
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export { Order };
