import { Order } from "../moduls/order.js"; // Ensure the path is correct

const OrderSummary = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId','name') 
      .populate('products'); 


    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.json(orders); 
    

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const Delete=async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export { OrderSummary ,Delete};
