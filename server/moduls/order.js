
import mongoose from "mongoose";

const orderSchema = new  mongoose.Schema({
  address:{type:String},
  address2:{ type: String },
  city:{ type: String },
  state:{ type: String  },
  zip:{ type: String  },
  
 createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);



export{Order};