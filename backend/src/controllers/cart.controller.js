import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const userId = req.userId;
  try {
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    // Check if user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() == productId
    );

    if (itemIndex > -1) {
      return res
        .status(400)
        .json({ message: "Item already in the cart", success: false });
    }

    cart.items.push({ product: productId, quantity, price: product.price });

    await cart.save();

    res
      .status(200)
      .json({ message: "Item added to cart", cart, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart", cart, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    const item = cart.items.find(
      (item) => item.product.toString() == productId.toString()
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found in cart", success: false });
    }

    item.quantity = quantity;

    const updatedCart = await cart.save();
    const populatedCart = await updatedCart.populate("items.product");

    res.status(200).json({
      cart: populatedCart, 
      success: true,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found", success: false });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
