import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserM', required: true },
    
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
        quantity: { type: Number, required: true, default: 1 } ,
        }
);

const Cart = mongoose.model('Cart', CartSchema);
export {Cart};
