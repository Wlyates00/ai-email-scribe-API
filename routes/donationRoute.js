import express from "express";
import "dotenv/config";
import Stripe from "stripe";
import cors from "cors";

// Private Stripe key
const stripe = new Stripe(process.env.STRIPE_KEY);

// To create routes to use in api.js
const router = express.Router();
// For compatibility between port numbers
router.use(cors());
// For parsing json
router.use(express.json());

// Setting API endpoint URL
router.post("/", async (req, res) => {
  // Grabbing payment_id and donation amount
  const { payment_method_id, amount } = req.body;

  // Try a payment
  try {
    // Create and confirm a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount is in cents so (X 100)
      currency: "usd", // Currency type
      payment_method: payment_method_id, // Payment_id
      confirm: true, // Confirm the payment
      automatic_payment_methods: {
        enabled: true, // Stripe will dynamically determine which payment methods are available and appropriate for the transaction.
        allow_redirects: "never", // Avoid redirects
      },
    });

    // Respond back with the client secret (Purchase will be confirmed on the client side with this)
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error.message);
    // Handle and send error response
    res.status(500).send({
      error: error.message,
    });
  }
});

export default router;
