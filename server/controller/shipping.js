import { Order } from "../moduls/order.js";
const Orders= async (req, res) => {
    try {
        const {address,address2,state,city,zip } = req.body;
        
        //  if (!address || !address2 ||!state|| !city ||!zip) {
        //  return res.status(400).json({ error: 'Missing required fields' })};
         
        const newOrder = new Order({ address,address2, city, state,zip });
        
        await newOrder.save();
        
        res.status(201).json({ message: 'Order created successfully!' }); 
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error creating order!' });
    }
  };
        
;
export {Orders}