import {Cart} from "../moduls/cart.js"

const Carts=async (req, res) => {
    const { userId, productId,quantity,  totalPrice} = req.body; // Include userId
    try {
          
        

          let  cartItem = new Cart({ productId,  quantity,  totalPrice, userId }); // Include userId when creating a new item
            await cartItem.save();
        

        res.status(200).json(cartItem);}
     catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export{Carts}