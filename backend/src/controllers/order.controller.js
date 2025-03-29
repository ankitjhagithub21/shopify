import dotenv from "dotenv";
dotenv.config();
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let totalAmount = 0;

    // Validate each product and calculate total amount
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create the order
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: "Pending", // Default status
      orderStatus: "Processing",
    });

    await newOrder.save();

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    const line_items = items.map((item) => ({
      price: item.price,
      quantity: item.quantity,
      
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.ORIGIN}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.ORIGIN}/verify?succes=false&orderId=${newOrder._id}`,
    });

    res.status(201).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
