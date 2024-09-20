import { Order } from "../moduls/order.js"; // Assuming you have a 'order.js' file 

const OrderSummry = async (req, res) => {
  // ... rest of your code


try {
    const order = await Order.find()
      .populate('userId') // Populate 'userId' field (assuming you have a User model)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order); // Send the populated order as JSON
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {OrderSummry}; // Export the function
