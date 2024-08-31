import {Cart} from "../moduls/cart.js"

const Carts=async (req, res) => {
    const { productId, quantity, userId } = req.body; // Include userId
    try {
        let cartItem = await Cart.findOne({ productId, userId });
        if (cartItem) {
            // If item exists, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // If item doesn't exist, create a new one
            cartItem = new Cart({ productId, quantity, userId }); // Include userId when creating a new item
            await cartItem.save();
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export{Carts}