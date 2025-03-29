import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createOrder, userOrders, verifyOrder } from "../controllers/order.controller.js";


const router = express.Router();

router.post("/create",isAuthenticated,createOrder)
router.post("/verify",isAuthenticated,verifyOrder)
router.get("/userorders",isAuthenticated,userOrders)

export default router;
