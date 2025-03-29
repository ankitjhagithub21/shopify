import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createOrder } from "../controllers/order.controller.js";


const router = express.Router();

router.post("/create",isAuthenticated,createOrder)

export default router;
