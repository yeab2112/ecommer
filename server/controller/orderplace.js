import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.stripe_secret_key);


const OrderPlace= async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Change this to your desired currency
        });

        // Send the client secret back to the client
        res.send({ id: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Payment failed. Please try again later.' });
    }
};

export{OrderPlace}
