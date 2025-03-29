import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createOrder, getAllOrders, userOrders, verifyOrder } from "../controllers/order.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const router = express.Router();

router.post("/create",isAuthenticated,createOrder)
router.post("/verify",isAuthenticated,verifyOrder)
router.get("/userorders",isAuthenticated,userOrders)
router.get("/",isAuthenticated,isAdmin,getAllOrders)

export default router;
