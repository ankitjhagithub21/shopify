import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);
router.get("/", isAuthenticated, getCart);
router.delete("/remove", isAuthenticated, removeFromCart);
router.put("/update", isAuthenticated, updateCartItem);
router.delete("/clear", isAuthenticated, clearCart);

export default router;
