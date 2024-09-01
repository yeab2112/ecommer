import { Order } from "../moduls/order.js";
const Shipping = async (req, res) => {
  try {
    const { address, address2, state, city, zip, userId, products, totalPrice, paymentMethod } = req.body;

    if (!address || !address2 || !state || !city || !zip || !userId || !products || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' })
    };

    const newOrder = new Order({ address, address2, city, state, zip, user: userId, products, totalPrice, paymentMethod });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating order!' });
  }
};

;
export { Shipping }