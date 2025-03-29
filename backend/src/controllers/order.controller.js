import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";
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
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });
      res.status(200).json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
