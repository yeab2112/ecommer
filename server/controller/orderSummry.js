import { Order } from "../moduls/order.js";
const OrderSummry = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  export{OrderSummry} 