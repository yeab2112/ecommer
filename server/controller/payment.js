import { Order } from "../moduls/order.js";


const Payment= async (req, res) => {

    try {
        const { totalPrice, paymentMethod} = req.body;

         if (!totalPrice || !paymentMethod ) {
         return res.status(400).json({ error: 'Missing required fields' })};
         {
        const newOrder = new Order({ totalPrice,paymentMethod });
        
        await newOrder.save();
        
        res.status(201).json({ message: 'Order submitted successfully' }) };
         }catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to submit order' });
        }}

export{Payment}
